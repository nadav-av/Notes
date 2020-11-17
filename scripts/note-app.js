'use strict'

let notes = getSavedNotes()

const filters= {
    searchText: '',
    sortBy: 'byEdited'
}


renderNotes(notes, filters) //initial render


//defining the note object- each new note pushed to the notes array and saved to storage
document.querySelector('#create-note').addEventListener('click', (e)=>{
    const timeStamp= moment().valueOf()
    const add= 
    {
        id: uuidv4(),
        title: '',
        body: '',
        createdAt: timeStamp,
        updatedAt: timeStamp,
    }
    notes.push(add)
    saveToStorage(notes)
    location.assign(`/edit.html#${add.id}`) //creating new note assigning to the edit page
})


//event listener for the search filter
document.querySelector('#search-text').addEventListener('input', (e)=>{
    filters.searchText= e.target.value
    renderNotes(notes,filters)
})


//eventlistener for sort by
document.querySelector('#filter-by').addEventListener('change', (e)=>{
    filters.sortBy= e.target.value
    renderNotes(notes, filters)
})



//maek changes live as storage changes- means when 2 live tabs i opened, the other is changing also live- no need to refresh
window.addEventListener('storage', (e)=>{
    if(e.key==='notes')
    {
        notes= JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})
