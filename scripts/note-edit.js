'use strict'

const titleElement= document.querySelector('#note-title') //querySelector is expensive so dont select it twice
const bodyElement= document.querySelector('#note-body')
const noteId= location.hash.substring(1) //in the page of editting we want to work on the specific note
const when= document.querySelector('#time-stamp')
let notes = getSavedNotes()

let note = notes.find( (item) => item.id === noteId)
    
if(!note)
{
    location.assign('/index.html')
}

titleElement.value = note.title //so the title will be shown in the page as defult
bodyElement.value = note.body
when.textContent= lsatEditedStamp(note.updatedAt)


    titleElement.addEventListener('input', (e)=>{
        note.title= e.target.value
        note.updatedAt= moment().valueOf() //updating udatedAt
        when.textContent= lsatEditedStamp(note.updatedAt) //sending the new updated time to change last edited
        saveToStorage(notes)
    })



    bodyElement.addEventListener('input', (e)=>{
        note.body = e.target.value
        note.updatedAt= moment().valueOf()
        when.textContent= lsatEditedStamp(note.updatedAt)
        saveToStorage(notes)
    })


    document.querySelector('#remove-note').addEventListener('click', (e)=>{
        removeNote(note.id)
        saveToStorage(notes)
        location.assign('/index.html')
    })


    //for 2 tabs live changing by updating storage
    window.addEventListener('storage', (e)=>{
        if(e.key==='notes'){
            notes= JSON.parse(e.newValue)
        }
         note = notes.find(function(item){
            return item.id === noteId
        })
        
        if(!note)
        {
            location.assign('/index.html')
        }
        
        titleElement.value = note.title
        bodyElement.value = note.body
        when.textContent= lsatEditedStamp(note.updatedAt)
    })


