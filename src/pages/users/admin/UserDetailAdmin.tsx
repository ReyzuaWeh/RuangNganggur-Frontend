import DashboardLayout from '@components/DashboardLayout';
import Loading from '@components/Loading';
import NotFound from '@components/NotFound';
import ImageModals from '@components/profile/ImageModals';
import ValidationComponents from '@components/ValidationError';
import { DataOutUser, ErrorValidation } from '@dataType/fetch';
import { RoleType } from '@dataType/khusus';
import { useMyProfile } from '@provider/userProvider';
import fetchUser from '@utils/fetch/users';
import functionSets from '@utils/function';
import swalError from '@utils/swal/error';
import swalSuccess from '@utils/swal/success';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const UserDetailAdmin = () => {
	const { profile } = useMyProfile()
	if (profile?.role !== RoleType.admin) return <NotFound />;
	const { id } = useParams();
	const [validationError, setValidationError] = useState<ErrorValidation | null>(null);
	const [user, setUser] = useState<DataOutUser>({
		username: "",
		email: "",
		password: "",
		role: RoleType.jobseeker,
		registered_at: new Date(),
		disabled: false,
		jobseeker: null,
		employer: null,
	});
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(false);

	const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setUser(prev => ({ ...prev, [name]: value || null }))
	}
	const handleFieldSub = functionSets.handleChangeProfile
	const handleFieldSubJobSeeker = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		handleFieldSub(RoleType.jobseeker, setUser, name, value)
	}
	const handleFieldSubEmployer = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		handleFieldSub(RoleType.employer, setUser, name, value)
	}
	const handleFieldFileJobSeeker = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		if (!file) {
			handleFieldSub(RoleType.jobseeker, setUser, e.target.id, null);
			handleFieldSub(RoleType.jobseeker, setUser, e.target.id + "_file", null);
			handleFieldSub(RoleType.jobseeker, setUser, e.target.id + "_name", null);
			return
		};
		try {
			const base64String = await functionSets.getBase64(file);
			handleFieldSub(RoleType.jobseeker, setUser, e.target.id, file.name);
			handleFieldSub(RoleType.jobseeker, setUser, e.target.id + "_file", base64String);
			handleFieldSub(RoleType.jobseeker, setUser, e.target.id + "_name", file.name);
			console.log(user)
		} catch (error) {
			console.error('Error reading file:', error);
		}
	};
	const handleToggle = () => {
		setUser(prev => ({ ...prev, disabled: !user.disabled }))
	};
	const handleSubmit = () => {
		if (id) {
			setSaving(true)
			return fetchUser.updateUser(user, parseInt(id)).then(() => {
				setValidationError(null)
				swalSuccess({ title: "Update User Success", message: `User ${user.username} has been updated` })
			}).catch(async (error) => {
				if (error.status === 500 || !error.status) return setValidationError(null);
				if (error.status === 422 || error.status === 400 || error.status === 409) {
					const errorData = await error.json();
					setValidationError(errorData);
					return swalError(error, "Wrong Update Input");
				}
				swalError(error.status, `Cannot Update User ${user.username}`);
			}).finally(() => setSaving(false))
		}
		return fetchUser.register(user).then(() => {
			setValidationError(null)
			swalSuccess({ title: "Update User Success", message: `User ${user.username} has been updated` })
		}).catch(async (error) => {
			if (error.status === 500 || !error.status) return setValidationError(null);
			if (error.status === 422 || error.status === 400 || error.status === 409) {
				const errorData = await error.json();
				setValidationError(errorData);
				return swalError(error, "Wrong Update Input");
			}
			swalError(error.status, `Cannot Update User ${user.username}`);
		})
	}
	useEffect(() => {
		if (id) {
			setLoading(true)
			fetchUser.getUser(parseInt(id)).then(e => {
				setUser(e)
			}).catch(err => {
				swalError(err.status, "Cannot get data user")
			}).finally(() => setLoading(false))
		} else {
			setUser({
				username: "",
				email: "",
				password: "",
				role: RoleType.jobseeker,
				registered_at: new Date(),
				disabled: false,
				jobseeker: null,
				employer: null,
			})
		}
	}, [id]);
	return loading ? <Loading /> : (
		<DashboardLayout>
			<div className="flex items-center gap-x-4 mb-5 md:mb-10">
				<h1 className="text-lg md:text-2xl font-semibold">
					{"Create User"}
				</h1>
			</div>
			<div className="mx-auto p-4">
				<form
					onSubmit={e => {
						e.preventDefault();
						const requestUser = {
							...user,
							user: id || user.id,
							employer: user.role === RoleType.employer ? user.employer : null,
							jobseeker: user.role === RoleType.jobseeker ? user.jobseeker : null
						};
						setUser(requestUser);
						handleSubmit()
					}}
					className="space-y-6"
				>
					{/* User Section */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold mb-4">User</h3>
						<ImageModals
							currentImage={user.image}
							setProfile={setUser as React.Dispatch<React.SetStateAction<DataOutUser | null>>}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2 h-full">
								<label htmlFor="username" className="block text-sm font-medium text-gray-700">
									Username <span className="text-red-600">*</span>
								</label>
								<input
									id="username"
									name="username"
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter username"
									value={user.username}
									onChange={handleField}
									required
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">
									Email <span className="text-red-600">*</span>
								</label>
								<input
									id="email"
									name="email"
									type="email"
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter email"
									value={user.email || ""}
									onChange={handleField}
									required
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Password {!id && (<span className="text-red-600">*</span>)}
								</label>
								<label htmlFor='password' className="w-full border rounded-md p-2 text-black flex justify-between">
									<input
										id="password"
										name="password"
										type={isShowPassword ? "text" : "password"}
										placeholder="Enter password"
										value={user.password || ""}
										onChange={handleField}
										required={id ? false : true}
									/>
									<button
										type="button"
										onClick={() => setIsShowPassword(!isShowPassword)}
										className="w-fit text-gray-600"
									>
										{isShowPassword ? <FaEye /> : <FaEyeSlash />}
									</button>
								</label>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="role" className="block text-sm font-medium text-gray-700">
									Role User <span className="text-red-600">*</span>
								</label>
								<select
									id="role"
									name="role"
									className="w-full border rounded-md p-2 text-black"
									value={user.role}
									onChange={handleField}
									required
								>
									{
										Object.values(RoleType).map(role => (
											<option key={role} value={role}>
												{role.charAt(0).toUpperCase() + role.slice(1)}
											</option>
										))
									}
								</select>
							</div>
							<div className="flex items-center justify-between">
								<label className="text-sm font-medium text-gray-700">Status</label>
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-600">
										{user.disabled ? "Disabled" : "Not Disabled"}
									</span>
									<button
										type="button"
										onClick={handleToggle}
										className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${user.disabled ? 'bg-red-500' : 'bg-green-300'
											}`}
									>
										<div
											className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${user.disabled ? 'translate-x-6' : 'translate-x-0'
												}`}
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* Company Section */}
					{user.role === RoleType.employer && (<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold mb-4">Company</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2 h-full">
								<label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
									Company Name <span className="text-red-600">*</span>
								</label>
								<input
									id="company_name"
									name="company_name"
									value={user.employer?.company_name}
									onChange={handleFieldSubEmployer}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter company name"
									required
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="company_address" className="block text-sm font-medium text-gray-700">
									Company Address
								</label>
								<input
									id="company_address"
									name="company_address"
									value={user.employer?.company_address || ""}
									onChange={handleFieldSubEmployer}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter company address"
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="company_phone_number" className="block text-sm font-medium text-gray-700">
									Company Phone Number
								</label>
								<input
									id="company_phone_number"
									name="company_phone_number"
									value={user.employer?.company_phone_number || ""}
									onChange={handleFieldSubEmployer}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter company phone"
								/>
							</div>
						</div>
						<div className="mt-4 space-y-4">
							<div className="space-y-2 h-full">
								<label htmlFor="company_vision" className="block text-sm font-medium text-gray-700">
									Company Vision
								</label>
								<textarea
									id="company_vision"
									name="company_vision"
									value={user.employer?.company_vision || ""}
									onChange={handleFieldSubEmployer}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter company vision"
									rows={4}
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="company_mission" className="block text-sm font-medium text-gray-700">
									Company Mission
								</label>
								<textarea
									id="company_mission"
									name="company_mission"
									value={user.employer?.company_mission || ""}
									onChange={handleFieldSubEmployer}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter company mission"
									rows={4}
								/>
							</div>
						</div>
					</div>)}

					{/* Job Seeker Section */}
					{user.role === RoleType.jobseeker && (<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold mb-4">Job Seeker</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2 h-full">
								<label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
									First Name <span className="text-red-600">*</span>
								</label>
								<input
									id="first_name"
									name="first_name"
									value={user.jobseeker?.first_name}
									onChange={handleFieldSubJobSeeker}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter first name"
									required
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
									Last Name
								</label>
								<input
									id="last_name"
									name="last_name"
									value={user.jobseeker?.last_name || ""}
									onChange={handleFieldSubJobSeeker}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter last name"
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="nis" className="block text-sm font-medium text-gray-700">
									NIS <span className="text-red-600">*</span>
								</label>
								<input
									id="nis"
									name="nis"
									value={user.jobseeker?.nis}
									onChange={handleFieldSubJobSeeker}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter NIS"
									required
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="graduate_year" className="block text-sm font-medium text-gray-700">
									Graduate Years
								</label>
								<input
									id="graduate_year"
									name="graduate_year"
									value={user.jobseeker?.graduate_year || 0}
									onChange={handleFieldSubJobSeeker}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter graduate year"
									type="number"
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
									Phone Number
								</label>
								<input
									id="phone_number"
									name="phone_number"
									value={user.jobseeker?.phone_number || ""}
									onChange={handleFieldSubJobSeeker}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter phone number"
								/>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="resume" className="block text-sm font-medium text-gray-700">
									Resume
								</label>
								<div className="file-input-wrapper">
									<input
										id="resume"
										name="resume"
										onChange={handleFieldFileJobSeeker}
										className="w-full border rounded-md p-2 text-black"
										accept='application/pdf'
										placeholder="Upload resume"
										type="file"
									/>
									<p className="mt-2 text-sm text-gray-500">
										{user.jobseeker?.resume ?
											(
												<a href={user.jobseeker?.resume} target="_blank">
													{functionSets.truncateWord(user.jobseeker?.resume.split("/").pop() || "", 20)}
												</a>
											)
											: "No file attached"}
									</p>
								</div>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="cv" className="block text-sm font-medium text-gray-700">
									CV
								</label>
								<div className="file-input-wrapper">
									<input
										id="cv"
										name="cv"
										onChange={handleFieldFileJobSeeker}
										className="w-full border rounded-md p-2 text-black"
										placeholder="Upload CV"
										accept="application/pdf"
										type="file"
									/>
									<p className="mt-2 text-sm text-gray-500">
										{user.jobseeker?.cv ?
											(
												<a href={user.jobseeker?.cv} target="_blank">
													{functionSets.truncateWord(user.jobseeker?.cv.split("/").pop() || "", 20)}
												</a>
											)
											: "No file attached"}
									</p>
								</div>
							</div>
							<div className="space-y-2 h-full">
								<label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
									Portfolio
								</label>
								<div className="file-input-wrapper">
									<input
										id="portfolio"
										name="portfolio"
										onChange={handleFieldFileJobSeeker}
										className="w-full border rounded-md p-2 text-black"
										accept='application/pdf'
										type="file"
									/>
									<p className="mt-2 text-sm text-gray-500">
										{user.jobseeker?.portfolio ?
											(
												<a href={user.jobseeker?.portfolio} target="_blank">
													{functionSets.truncateWord(user.jobseeker?.portfolio.split("/").pop() || "", 20)}
												</a>
											)
											: "No file attached"}
									</p>
								</div>
							</div>
						</div>
						<div className="mt-4">
							<div className="space-y-2 h-full">
								<label htmlFor="skills" className="block text-sm font-medium text-gray-700">
									Skills
								</label>
								<textarea
									id="skills"
									name="skills"
									value={user.jobseeker?.skills || ""}
									onChange={handleFieldSubJobSeeker}
									className="w-full border rounded-md p-2 text-black"
									placeholder="Enter your skills"
									rows={4}
								/>
							</div>
						</div>
					</div>)}
					{validationError && <ValidationComponents errorValid={validationError} />}
					<div className="w-full text-end">
						<button type='submit' className='btn-primary p-2 rounded' disabled={saving}>
							{saving ? "Saving..." : "Save"}
						</button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
};

export default UserDetailAdmin;
