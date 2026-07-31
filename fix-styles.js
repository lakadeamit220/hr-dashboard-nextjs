const fs = require('fs');

// Fix EmployeeDetailPanel.jsx
let detail = fs.readFileSync('src/components/employees/EmployeeDetailPanel.jsx', 'utf8');
detail = detail.replace(/bg-slate-50(?![\/\w])/g, 'bg-slate-50/50');
detail = detail.replace(/border-slate-200/g, 'border-slate-300/70');
fs.writeFileSync('src/components/employees/EmployeeDetailPanel.jsx', detail);
console.log('Updated EmployeeDetailPanel.jsx');

// Fix EmployeeForm.jsx
let form = fs.readFileSync('src/components/employees/EmployeeForm.jsx', 'utf8');
form = form.replace(/bg-slate-50(?![\/\w])/g, 'bg-slate-50/50');
form = form.replace(/border-slate-200/g, 'border-slate-300/70');
form = form.replace(/bg-white/g, 'bg-white/5 backdrop-blur-[2px]');
// The above might break if bg-white is used elsewhere. Let's fix specific one:
form = form.replace(/bg-white\/5 backdrop-blur-\[2px\]\/5 backdrop-blur-\[2px\]/g, 'bg-white/5 backdrop-blur-[2px]'); // fix double replacement if any
fs.writeFileSync('src/components/employees/EmployeeForm.jsx', form);
console.log('Updated EmployeeForm.jsx');

// Fix Input.jsx
let input = fs.readFileSync('src/components/ui/Input.jsx', 'utf8');
input = input.replace(/border-slate-300'/g, "border-slate-300/70'");
input = input.replace(/bg-slate-50(?![\/\w])/g, 'bg-slate-50/50');
fs.writeFileSync('src/components/ui/Input.jsx', input);
console.log('Updated Input.jsx');

// Fix Select.jsx
let select = fs.readFileSync('src/components/ui/Select.jsx', 'utf8');
select = select.replace(/border-slate-300'/g, "border-slate-300/70'");
select = select.replace(/bg-slate-50(?![\/\w])/g, 'bg-slate-50/50');
fs.writeFileSync('src/components/ui/Select.jsx', select);
console.log('Updated Select.jsx');
