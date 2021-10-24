const csv = require("fast-csv");

const fs = require("fs");

const db = require("../models");
const rp = require("request-promise-native");
const request = require('request');

 const Student = db.students;
 const Apod = db.apod;

const Path = require('path');
// const upload = require("../middlewares/upload");



const displayPicture = async (req, res) => {
  try {
    const dateRequested =req.params.id;
    const apodFromDb = await Apod.findAll({
      where: {
        Dateforapod: dateRequested
      }
    });
    if (apodFromDb.length){
      apodFromDb[0].path='/images/'+dateRequested+'.jpg';
      ParsedResponse=apodFromDb[0];
      console.log(ParsedResponse)
      ParsedResponse.err=0;
      res.render('index', {ParsedResponse})

     // res.send(apodFromDb);
    }
    else{
      let response = await rp("https://api.nasa.gov/planetary/apod?api_key=t6aUMiURPcerbdrrbQv4MinUroT4s2ZLYDa0I4St&date="+dateRequested);
      let ParsedResponse =JSON.parse(response);
      console.log(ParsedResponse);
      ParsedResponse.Dateforapod=ParsedResponse.date;
      
      if(ParsedResponse.media_type==="image"){

        let path ='./images/'+ParsedResponse.date+'.jpg';
        ParsedResponse.path=path;

      // const  const downloaded = await download(ParsedResponse.url,ParsedResponse.date);
        const data = await download(ParsedResponse.url, path);
        // const data = await download(ParsedResponse.url, './images/images.jpg');
        console.log(data);
        ParsedResponse.path='/images/'+ParsedResponse.date+'.jpg';;

        ParsedResponse.err=0;
        res.render('index', {ParsedResponse})

      //  res.send(ParsedResponse);

      }
      else {

        ParsedResponse.err=0;
        res.render('index', {ParsedResponse})

      }
      let StoredIndb =  await Apod.create(ParsedResponse);
    
      
  
    }
  } catch (error) {


    if(error.statusCode==400){
      let msg=JSON.parse(error.error).msg;
      res.send(msg)

    }else {
    console.error(error);
    res.send(error);
    }
  }





  };
  async function downloadfetch(url,name) {
    const response = await fetch(url);
    const buffer = await response.buffer();
      new Promise((resolve, reject) => {

        try {
         

        fs.writeFile(`./`+name+'.jpg', buffer, () => 
          resolve('finished downloading!'));

 
        } catch (error) {
          reject(error)

        }

      })



  }


  async function download(url, dest) {
    // const dir = '/images';
   
    // fs.exists(dir, exist => {
    //   if (!exist) {
    //     return fs.mkdir(dir, error => cb(error, dir))
    //   }
    //   })

    console.log(url);
    console.log(dest);
    /* Create an empty file where we can save data */
    const file = fs.createWriteStream(dest);

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    await new Promise((resolve, reject) => {
      request({
        /* Here you should specify the exact link to the file you are trying to download */
        uri: url,
      })
          .pipe(file)
          .on('finish', async () => {
            console.log(`The file is finished downloading.`);
            resolve("sucesss");
          })
          .on('error', (error) => {
            reject(error);
          });
    })
        .catch((error) => {
          
          console.log(`Something happened: ${error}`);
          reject(error);

        });
}

module.exports = {

  displayPicture

};