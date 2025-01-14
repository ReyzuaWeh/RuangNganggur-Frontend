import React, { useState } from 'react';

const MonthDropdown = () => {
    const [selectedMonth, setSelectedMonth] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    return (

        <select
            id="month"
            name="month"
            value={selectedMonth}
            onChange={handleChange}
            className="p-2 border rounded"
        >
            <option value="">Month</option>
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
        </select>


    );
};


// const getMonthName = (month) => {
//   const months = [
//     'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
//     'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
//   ];
//   return months[month - 1]; 
// };

export default MonthDropdown;
