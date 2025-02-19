const SaveComponent = (
    { isLoading }: {
        isLoading: boolean
    }
) => {
    return (
        <div className="flex justify-start mt-0">
            <button
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
                disabled={isLoading}
                type="submit"
            >
                {!isLoading ? "Save" : "Saving..."}
            </button>
        </div>
    )
}
export default SaveComponent