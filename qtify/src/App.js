import Hero from './components/Hero/Hero';
//import Logo from './components/Logo/Logo';
import Navbar from './components/Navbar/Navbar';
import styles from './App.css';
import Section from './components/Section/Section';
import FilterSection from './components/FilterSection/FilterSection';
import { getNewAlbumsList, getSongsList, getTopAlbumsList } from './api/api';
import { useEffect, useState } from 'react';


function App() {
  const[topAlbum,setTopAlbum] = useState([]);
  const[newAlbum,setNewAlbum] = useState([]);

  const[Songs , setSongs] = useState([]);
  const[value,setValue]= useState(0);
  const[filteredData, setFilteredData]=useState([]);
  
  const searchTopAlbum=async()=>{
    try{
      const res= await getTopAlbumsList();
      setTopAlbum(res);
    }
    catch(error){
      console.log(error);
      return null;
    } 
  }

  const searchNewAlbumSongs=async()=>{
    try{
      const res= await getNewAlbumsList();
    setNewAlbum(res);
    }
    catch(error){
      console.log(error);
      return null;
    } 
  }

  const searchSongs=async()=>{
    try{
      const res=await getSongsList();
      setSongs(res);
      setFilteredData(res);
    }
    catch(error){
      return null;
    }
  }

  const generateNewSongs=(index)=>{

    let key="";
    if(index===0){
      searchSongs();
      return;
    }
    else if(index===1){
      key="rock";
    }
    else if(index===2){
      key="pop";
    }
  
    else if(index===3){
      key="jazz";
    }
    else if(index===4){
      key="blues";
    }
  
    let newSongsArray=Songs.filter((song)=>{
      console.log("key: ",key)
      return(song.genre.key===key);
    })
  
    setFilteredData(newSongsArray);
  }

  const handleChangeIndex= async(newValue)=>{
    setValue(newValue);
    generateNewSongs(newValue);
   }
  
    useEffect(()=>{
      searchTopAlbum();
      searchNewAlbumSongs();
      searchSongs();
    },[])
  


  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div className={styles.sectionWrapper}>
      <Section type='album' title='Top Albums' data={topAlbum}/>
      <Section type='album' title='New Albums' data={newAlbum}/>
      <FilterSection  type='song' title='Songs' value={value} filteredData={filteredData} handleChangeIndex={handleChangeIndex}/>
      </div>
    </div>
  );
}

export default App;
