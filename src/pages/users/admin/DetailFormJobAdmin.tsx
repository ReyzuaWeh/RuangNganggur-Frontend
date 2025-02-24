import DashboardLayout from "@components/DashboardLayout";
import NotFound from "@components/NotFound";
import ValidationComponents from "@components/ValidationError";
import { DataOutJob, ErrorValidation } from "@dataType/fetch";
import { GenderType, JobPhase, JobType, RoleType } from "@dataType/khusus";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobForm = () => {
	const { id } = useParams<{
		id: string
	}>();
	const numericId = Number(id);
	if (isNaN(numericId) && id) return <NotFound />
	const { profile } = useMyProfile()
	if (profile?.role !== RoleType.admin) return <NotFound is403={true} />;
	const [saving, setSaving] = useState(false);
	const [dataForm, setDataForm] = useState<DataOutJob>({
		employer_id: 0,
		role: "",
		min_age: 0,
		max_age: 0,
		location: "",
		salary: 0,
		type_job: null,
		open_date: new Date(),
		close_date: null,
		description: ""
	})
	const [listCompany, setListCompany] = useState<Record<number, string> | undefined>()
	const [error_validation, setError_validation] = useState<ErrorValidation | undefined>(undefined);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		if (!/^\d*$/.test(value) && name === "salary") return
		let parsedValue
		if (type === 'date' && value) parsedValue = functionSets.formatStringtoDate(value)
		parsedValue = type === 'number' ? parseInt(value) : value;
		setDataForm({ ...dataForm, [name as keyof DataOutJob]: parsedValue || null });
	}
	const handlFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		const { name } = e.target;
		if (!file) {
			setDataForm((prev) => ({ ...prev, [name + "_file"]: null, [name + "_name"]: null }));
			return;
		}
		const base64String = await functionSets.getBase64(file);
		setDataForm((prev) => ({
			...prev,
			[name + "_file"]: base64String,
			[name + "_name"]: file.name,
		}));
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSaving(true)
		if (id) {
			return fetchJob.updateJob({ id: numericId, dataUpdate: dataForm }).then(() => {
				swalSuccess({ title: "Updated", message: "Job has been updated" })
				setError_validation(undefined)
			}).catch(async error => {
				if (error.status) {
					if (functionSets.isBadOrConflictRequest(error.status) || error.status === 404) {
						const data = await error.json()
						swalError(error.status, "Input not valid!")
						setError_validation(data);
					} else {
						swalError(error.status, "Can't update job")
					}
				}
				console.error("Error updating job:", error);
			}).finally(() => setSaving(false))
		}
		fetchJob.postJob(dataForm).then(() => {
			swalSuccess({ title: "Posted", message: "Job has been posted" })
			setError_validation(undefined)
		}).catch(async error => {
			if (error.status) {
				if (functionSets.isBadOrConflictRequest(error.status) || error.status === 404) {
					const data = await error.json()
					swalError(error.status, "Input not valid!")
					setError_validation(data);
				} else {
					swalError(error.status, "Can't post job")
				}
			}
			console.error("Error posting job:", error);
		}).finally(() => setSaving(false))
	}
	useEffect(() => {
		if (id) {
			fetchJob.getJob(numericId, true).then(data => {
				setDataForm(data)
				setListCompany({ [data.employer_id as number]: data.employer?.company_name as string })
			}).catch(error => {
				swalError(error.status, "Cannot get data job")
			})
		} else {
			setDataForm({
				employer_id: 0,
				role: "",
				min_age: 0,
				max_age: 0,
				location: "",
				salary: 0,
				type_job: null,
				open_date: new Date(),
				description: ""
			})
		}
		fetchUser.getUsers({ role: RoleType.employer }).then(data => {
			const newData = data.reduce((acc, curr) => {
				if (curr.employer?.id && curr.employer?.company_name) {
					acc[curr.employer.id] = curr.employer.company_name;
				}
				return acc;
			}, {} as Record<number, string>);
			setListCompany(newData);
		}).catch(error => {
			console.error("Error fetching users:", error);
		})
	}, [id])
	return (
		<DashboardLayout>
			<form
				onSubmit={handleSubmit}
				className="min-h-screen flex justify-center items-center bg-gray-100 p-10"
			>
				<div className="w-full bg-white p-10 rounded-lg shadow-md">
					{/* Header */}
					<div className="flex justify-between items-center mb-8 flex-col md:flex-row">
						<h2 className="text-3xl font-bold">Data Job</h2>
					</div>
					<hr className="border-t-1 border-gray-800 my-6" />
					{/* Form Fields */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="flex items-center md:flex-row flex-col sm:col-span-2 lg:col-span-3 gap-x-5">
							<label htmlFor="employer_id" className="block text-black mb-1 w-full md:w-fit">Company <span className="text-red-600">*</span></label>
							<select
								name="employer_id"
								id="employer_id"
								value={dataForm?.employer_id}
								onChange={handleChange}
								className={`border p-3 rounded bg-gray-200 text-black w-full md:flex-1`}
								required
							>
								<option value={0}>Select Company</option>
								{listCompany && Object.entries(listCompany).map(([key, value]) => (
									<option key={key} value={key}>{value}</option>
								))}
							</select>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label htmlFor="role" className="block text-black mb-1 w-full md:w-32">Position <span className="text-red-600">*</span></label>
							<input
								type="text"
								name="role"
								id="role"
								value={dataForm?.role || ""}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
								required
							/>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label htmlFor="min_age" className="block text-black mb-1 w-full md:w-32">Min Age</label>
							<input

								type="number"
								name="min_age"
								id="min_age"
								value={dataForm.min_age || 0}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
							/>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label htmlFor="max_age" className="block text-black mb-1 w-full md:w-32">Max Age</label>
							<input
								type="number"
								name="max_age"
								id="max_age"
								value={dataForm.max_age || 0}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
							/>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label htmlFor="location" className="block text-black mb-1 w-full md:w-32">Location</label>
							<input
								type="text"
								name="location"
								id="location"
								value={dataForm.location || ""}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
							/>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label htmlFor="salary" className="block text-black mb-1 w-full md:w-32">Salary</label>
							<input
								type="number"
								name="salary"
								id="salary"
								value={dataForm.salary || 0}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
							/>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label htmlFor="gender" className="block text-black mb-1 w-full md:w-32">Gender</label>
							<select
								name="gender"
								id="gender"
								value={dataForm?.gender || ""}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
							>
								<option value="">All Gender</option>
								{Object.entries(GenderType).map(([key, value]) => (
									<option key={key} value={value}>{functionSets.capitalizeFirstLetter(value)}</option>
								))}
							</select>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label
								htmlFor="type_job"
								className="block text-black mb-1 w-full md:w-32"
							>Type Job</label>
							<select
								name="type_job"
								id="type_job"
								value={dataForm?.type_job || ""}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
							>
								<option value="">Select</option>
								{Object.entries(JobType).map(([key, value]) => (
									<option key={key} value={value}>{functionSets.capitalizeFirstLetter(String(value).replace("_", " "))}</option>
								))}
							</select>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label htmlFor="open_date" className="block text-black mb-1 w-full md:w-32">Open Date</label>
							<input
								type="date"
								name="open_date"
								id="open_date"
								value={functionSets.formatDatetoString(dataForm.open_date)}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
							/>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label htmlFor="close_date" className="block text-black mb-1 w-full md:w-32">Close Date</label>
							<input
								type="date"
								name="close_date"
								id="close_date"
								value={dataForm.close_date ? functionSets.formatDatetoString(dataForm.close_date) : ""}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
							/>
						</div>
						<div className="flex items-center md:flex-row flex-col">
							<label htmlFor="job_phase" className="block text-black mb-1 w-full md:w-32">Job Phase</label>
							<select
								name="job_phase"
								id="job_phase"
								value={dataForm?.job_phase || ""}
								onChange={handleChange}
								className="border p-3 rounded bg-gray-200 text-black w-full md:w-full"
							>
								<option value="">Select</option>
								{Object.entries(JobPhase).map(([key, value]) => (
									<option key={key} value={value}>{functionSets.capitalizeFirstLetter(String(value).replace("_", " "))}</option>
								))}
							</select>
						</div>
					</div>
					<div className="mt-6">
						<label htmlFor="description" className="block text-black mb-1 w-full md:w-32">Description</label>
						<textarea
							name="description"
							id="description"
							value={dataForm.description || ""}
							onChange={handleChange}
							className="border p-3 rounded w-full h-48 bg-gray-200 text-black"
						/>
					</div>
					<div className="mt-6">
						<label htmlFor="result" className="block text-black mb-1 w-full md:w-32">Upload Result</label>
						<div className="file-input-wrapper">
							<input
								type="file"
								name="result"
								accept="application/pdf"
								onChange={handlFileChange}
								className="border p-3 rounded text-black hover:border-blue-300 focus:ring focus:ring-blue-300 hover:shadow-md transition-all w-full"
							/>
							<p className="mt-2 text-sm text-gray-500">
								{dataForm.result ?
									(
										<a href={dataForm.result} target="_blank">
											{functionSets.truncateWord(dataForm.result.split("/").pop() || "", 20)}
										</a>
									)
									: "No file attached"}
							</p>
						</div>

					</div>
					{error_validation && <ValidationComponents errorValid={error_validation} />}
					<div className="flex space-x-4 gap-x-2 justify-center md:justify-end mt-4 md:mt-0 w-full">
						<button
							type='button'
							onClick={() => {
								window.history.back()
							}}
							className="bg-red-600 md:w-fit w-1/2 hover:bg-red-800 transition-colors text-white px-5 py-3 rounded"
						>
							Back
						</button>
						<button
							type='submit'
							className="bg-orange-400 md:w-fit w-1/2 hover:bg-orange-600 transition-colors text-white px-5 py-3 rounded"
							disabled={saving}
						>
							{saving ? "Saving..." : "Save"}
						</button>
					</div>
				</div>
			</form>
		</DashboardLayout>
	);
}

export default JobForm;
