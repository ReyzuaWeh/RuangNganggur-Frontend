import { DataOutUser } from "@dataType/fetch";
import React, { useState } from "react";

const AddResume = (
    { onClose, setProfile, profile }: {
        onClose: () => void, setProfile: (profile: DataOutUser | null) => void, profile?: DataOutUser | null
    }
) => {
    const [resumeUrl, setResumeUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!resumeUrl.trim()) {
            alert("Please enter a valid Google Drive URL.");
            return;
        }

        try {
            setIsSubmitting(true);
            const token = localStorage.getItem("access_token");
            const updatedProfile = {
                ...profile,
                jobseeker: {
                    ...profile?.jobseeker,
                    resume: resumeUrl,
                },
            };

            const response = await fetch("https://ruang-nganggur-fast-api.vercel.app/users/profile", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfile),
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                onClose();
            } else {
                console.error("Failed to update resume");
            }
        } catch (error) {
            console.error("Error updating resume:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Resume</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="resumeUrl" className="block font-medium mb-1">
                            Google Drive URL
                        </label>
                        <input
                            type="url"
                            id="resumeUrl"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            value={resumeUrl}
                            onChange={(e) => setResumeUrl(e.target.value)}
                            placeholder="Enter your Google Drive URL"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 border-primary  rounded-lg"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddResume;
