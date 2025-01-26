import { useState } from "react"

export default function SearchableList({items, children}) {
    const [searchTerm, setSearchTerm] = useState("") 

    const searchResults = items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

    function handleChange(e) {
        setSearchTerm(e.target.value)
    }
    
    
    return <div className="searchable-list">
        <input type="search" placeholder="search" onChange={handleChange}/>
        <ul>
            {searchResults.map((item, index) => <li key={index}>{children(item)}</li>)}
        </ul>
    </div>

}