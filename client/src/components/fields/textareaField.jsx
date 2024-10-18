function textareaField({ label, name }) {
    return (
        <div className="space-y-1">
            <label className="text-gray-600 font-medium">{label}</label>
            <textarea
                name={name}
                className="w-full px-4 py-2 border border-green-300 rounded-md"
                rows="3"
                style={{ borderColor: '#68d391', color: '#2f855a' }}
                required
            />
        </div>
    );
}

export default textareaField;