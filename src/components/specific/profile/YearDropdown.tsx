import React, { useState } from "react";

const YearDropdown = () => {
    const [selectedYear, setSelectedYear] = useState("");
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    return (
        <select
            id="year"
            name="year"
            value={selectedYear}
            onChange={handleChange}
            className="p-2 border rounded"
        >
            <option value="">Year</option>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};

export default YearDropdown;
