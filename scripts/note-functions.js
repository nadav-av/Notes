'use strict'

//checked for exsisting saved data
const getSavedNotes= () => {
    const notesJSON= localStorage.getItem('notes')
    
    try{
        return notesJSON? JSON.parse(notesJSON) : [] 
    }catch(e){
        return []
    }


}


//saving data to local storage
const saveToStorage= (notes) =>
{
    localStorage.setItem('notes', JSON.stringify(notes))
}

//removing note from my list and from local storage
const removeNote= (id) =>
{
    const noteIndex = notes.findIndex((note)=> note.id===id)
  
    if(noteIndex>-1)
    {
        notes.splice(noteIndex, 1)
    }

}




//generate DOM structure for note item is the note itself object from notes 
const generateNoteDom= (item) =>
{

    //setting up a div containing a button and a text (note title)
    const noteEl= document.createElement('a')
    const texeEl= document.createElement('p') //'a' a block for herf: "..."
    const statusEl= document.createElement('p')
   
    //setup the title of the notes
    if(item.title.length===0)
    {
     texeEl.textContent= 'Untitled Note'
    }
    else
    {
    texeEl.textContent = item.title
    }
    texeEl.classList.add('list-item__title')
    noteEl.appendChild(texeEl)
    

    //setup link for noteEL
    noteEl.setAttribute('href',`/edit.html#${item.id}`)
    noteEl.classList.add('list-item')
  

    //setup status massege
    statusEl.textContent = lsatEditedStamp(item.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

//sort your notes by one of three ways
const sortNotes= (notes, sortBy) =>
{
    if(sortBy === 'byEdited')
    {
        return notes.sort((a,b)=>{
            if(a.updatedAt > b.updatedAt)
            {
                return -1
            }
            else if(a.updatedAt < b.updatedAt)
            {
                return 1;
            }
            else return 0;
        })
    }

    else if(sortBy === 'byCreated')
    {
        return notes.sort((a,b)=>{
            if(a.createdAt > b.createdAt)
            {
                return -1
            }
            else if(a.createdAt < b.createdAt)
            {
                return 1;
            }
            else return 0;
        })
    }

    else if(sortBy === 'alphabet')
    {
        return notes.sort((a,b)=>{
            if(a.title.toLowerCase() > b.title.toLowerCase())
            {
                return -1
            }
            else if(a.title.toLowerCase() < b.title.toLowerCase())
            {
                return 1;
            }
            else return 0;
        })
    }

    else return notes
}


//render application notes by filers as send from homePage
const renderNotes= (notes ,filters)=>{
    const notesEl= document.querySelector('#notes')
    notes= sortNotes(notes, filters.sortBy)

    const filterdNotes= notes.filter((item)=> (item.title.toLowerCase().includes(filters.searchText.toLowerCase())))
    

    notesEl.innerHTML= '' //for cleaning page- so no duplication
    
    if(filterdNotes.length>0)
    {
        filterdNotes.forEach((item)=>{
            const noteEl= generateNoteDom(item)
            notesEl.appendChild(noteEl)
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'You have 0 notes'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
        }


}


    //for each note in notes, generating a div (DOM) of note


//generate last edited
 const lsatEditedStamp = ((time) => `Last edited: ${moment(time).fromNow()}`)
