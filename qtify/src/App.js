//import logo from './logo.svg';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';
import FilterSection from './components/FilterSection/FilterSection';
import {getTopAlbums, getNewAlbums, getSongs} from './api/api'
import { useEffect, useState } from 'react';
import styles from "./App.module.css"

function App() {

  const[topAlbumSongsList,setTopAlbumSongs]=useState([]);
  const[newAlbumSongsList,setNewAlbumSongs]=useState([]);
  const[songsData, setSongsData]=useState([]);
  const[value,setValue]= useState(0);
  const[filteredData, setFilteredData]=useState([]);
  const generateTopAlbumSongs=async()=>{
    try{
      const res= await getTopAlbums();
    setTopAlbumSongs(res);
    }
    catch(error){
      console.log(error);
      return null;
    } 
  }

  const generateNewAlbumSongs=async()=>{
    try{
      const res= await getNewAlbums();
    setNewAlbumSongs(res);
    }
    catch(error){
      console.log(error);
      return null;
    } 
  }

  const generateSongs=async()=>{
    try{
      console.log("generateSongs");
      const res=await getSongs();
      setSongsData(res);
      setFilteredData(res);
    }
    catch(error){
      return null;
    }
  }

const generateNewSongs=(index)=>{

  let key="";
  if(index===0){
    generateSongs();
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

  let newSongsArray=songsData.filter((song)=>{
    console.log("key: ",key)
    return(song.genre.key===key);
  })

  console.log("generateNewSongs triggered and filtered this Data: ", newSongsArray)
  setFilteredData(newSongsArray);
}
//rock pop jazz blues


 const handleChangeIndex= async(newValue)=>{
  console.log("handleChangeIndex triggered with newValue: ",newValue)
  setValue(newValue);
  generateNewSongs(newValue);
 }

  useEffect(()=>{
    generateTopAlbumSongs();
    generateNewAlbumSongs();
    generateSongs();
  },[])

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div className={styles.sectionWrapper}>
      <Section type='album' title='Top Albums' data={topAlbumSongsList}/>
      <Section type='album' title='New Albums' data={newAlbumSongsList}/>
      <FilterSection  type='song' title='Songs' value={value} filteredData={filteredData} handleChangeIndex={handleChangeIndex}/>
      </div>
    </div>
  );
}

export default App;

