import images_source from "@/assets/get/images";
import { DataOutUser } from "@dataType/fetch";
import functionSets from "@utils/function";
import React from "react";
const handleChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>
) => {
    const image = e.target.files ? e.target.files[0] : null;
    if (!image) {
        functionSets.handleProfileNotSub(e.target.id, null, setProfile)
        functionSets.handleProfileNotSub(e.target.id + "_file", null, setProfile)
        functionSets.handleProfileNotSub(e.target.id + "_name", null, setProfile)
        return
    };
    try {
        const base64String = await functionSets.getBase64(image);
        functionSets.handleProfileNotSub(e.target.id, image.name, setProfile)
        functionSets.handleProfileNotSub(e.target.id + "_file", base64String, setProfile)
        functionSets.handleProfileNotSub(e.target.id + "_name", image.name, setProfile)
    } catch (error) {
        console.error('Error reading file:', error);
    }
}
const CircularImageInput = ({ currentImage, setProfile }: {
    currentImage?: string | null,
    setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>
}) => {
    // @ts-ignore
    const defaultImage = images_source["../no-profile.png"].default; // Ganti dengan path default image Anda
    const [imageInput, setImageInput] = React.useState<string | ArrayBuffer | null>(currentImage || null);
    const onChangeImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = (event) => {
                const result = event.target?.result as string;
                setImageInput(result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageInput(null);
        }
    };
    return (
        <div className="relative w-32 h-32 mx-auto mb-4 group border border-primary rounded-full">
            <input
                type="file"
                accept="image/*"
                onChange={e => {
                    onChangeImageFile(e)
                    handleChangeImage(e, setProfile)
                }}
                className="hidden"
                id="image"
            />
            <label
                htmlFor="image"
                className="cursor-pointer block w-full h-full rounded-full overflow-hidden relative"
            >
                <img
                    src={imageInput || defaultImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="text-white text-center">
                        <svg
                            className="w-8 h-8 mx-auto mb-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span className="text-sm">Change Photo</span>
                    </div>
                </div>
            </label>
        </div>
    );
};
export { handleChangeImage };
export default CircularImageInput
