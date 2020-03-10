const quickCreateIcons = [
    { id: 0, icon: '', title: 'File attachment is not working' },
    { id: 1, icon: '', title: 'Getting error when doing drag-drop..' },
    { id: 2, icon: '', title: 'File attachment is not working' },
    { id: 3, icon: '', title: 'User permission issues' },
    { id: 4, icon: '', title: 'Error popup is showing to create a..' },
    { id: 5, icon: '', title: 'File attachment is not working' },
    { id: 1, icon: '', title: 'Getting error when doing drag-drop..' },
    { id: 2, icon: '', title: 'File attachment is not working' },
    { id: 3, icon: '', title: 'User permission issues' },
    { id: 4, icon: '', title: 'Error popup is showing to create a..' },
]

const Email = [
    {id: 1, firstName: 'ram', lastName: 'qwew'},
    {id: 1, firstName: 'ram', lastName: 'qwew'},
    {id: 1, firstName: 'ram', lastName: 'qwew'},
    {id: 1, firstName: 'ram', lastName: 'qwew'},
    {id: 1, firstName: 'ram', lastName: 'qwew'},
  
] 
const selectLinkToExisting = [
    { id: 0, title: 'Tasks', icon: linkToTaskIcon },
    { id: 1, title: 'Projects', icon: linkToProjectIcon },
    { id: 2, title: 'Tickets', icon: linkToTicketIcon },
    { id: 3, title: 'Objectives', icon: linkToObjectiveIcon },
  ]
const weekDaysBtns = [
    { btnId: 0, isActive: false, btnName: 'SUN', },
    { btnId: 1, isActive: false, btnName: 'MON', },
    { btnId: 2, isActive: false, btnName: 'TUE', },
    { btnId: 3, isActive: false, btnName: 'WED', },
    { btnId: 4, isActive: false, btnName: 'THU', },
    { btnId: 5, isActive: false, btnName: 'FRI', },
    { btnId: 6, isActive: false, btnName: 'SAT', },
]
const assignToData = [
    { id: 0, name: 'John Dan', profile: '' },
    { id: 1, name: 'John Doe', profile: '' },
    { id: 2, name: 'John pazos', profile: '' },
    { id: 3, name: 'Mark John', profile: '' },
    { id: 4, name: 'John Dan', profile: '' },
    { id: 5, name: 'John Doe', profile: '' },
    { id: 6, name: 'John pazos', profile: '' },
    { id: 7, name: 'Mark John', profile: '' },
]
const tagsData = [
    { id: 0, title: 'Risk', },
    { id: 1, title: 'Critical Customer', },
    { id: 2, title: 'Phase1', },
    { id: 3, title: 'Technical', },
]
const TicketType = [
    { id: 1, icon: LowIcon, title: "Service request" },
    { id: 2, icon: HighIcon, title: "Incident" },
    { id: 3, icon: CriticalIcon, title: "Problem" },
]
const priorities = [
    { id: 1, icon: CriticalIcon, title: "Critical" },
    { id: 2, icon: HighIcon, title: "High" },
    { id: 3, icon: MediumIcon, title: "Medium" },
    { id: 4, icon: LowIcon, title: "Low" },
]
const linkRelatedRecords = [
    { id: 0, title: 'Project Management' },
    { id: 1, title: 'Metrik1 - marketing' },
    { id: 2, title: 'UI/UX design' },
    { id: 3, title: 'R&D on product1' },
    { id: 4, title: 'HR & Recruitment' },
    { id: 5, title: 'Project Management' },
    { id: 6, title: 'Project Management' },
] 

  export default { quickCreateIcons, Email, selectLinkToExisting, weekDaysBtns, assignToData, tagsData, TicketType, priorities, linkRelatedRecords}