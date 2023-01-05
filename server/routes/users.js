const fs = require('fs');

// variables
const dataPath = './server/data/users.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.log(err);
            }
            if (!data) data="{}";
            callback(returnJson ? JSON.parse(data) : data);
       });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                console.log(err);
            }

            callback();
        });
    };

 module.exports = {
    //READ
    get_conferences: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else
            {
                let json_data = JSON.parse(data);
                res.send(!data? JSON.parse("{}") :json_data);
            }
                
        });
    },

      //READ
      get_conferences_by_id: function (req, res) {
        const userId = req.params["id"];
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else
            {
                let json_data = JSON.parse(data);
                if(!json_data[userId])
                {
                    return res.sendStatus(400).send('conference is not exist');
                }
                else
                {
                   res.send(!data? JSON.parse("{}") :json_data[userId]);
 
                }
                
            }
                
        });
    },
  
    //CREATE

    create_conference: function (req, res) 
    {
        readFile(data => {    
            // add the new conference
            //לעשות בדיקות קלט
            let all_fields_array=["id","name","logo_picture","director","date","isSeries","series_number"];
            let fields_enterd = Object.keys(req.body);
            for (let i=0;i<all_fields_array.length;i++)
            {
                if(all_fields_array[i]!=fields_enterd[i])
                {
                    if(req.body.isSeries=="false" && i==6)
                    {
                        console.log("bhubufr");
                        break;
                    }
                    else
                    {
                        console.log("else");
                        console.log(req.body.isSeries);
                        return res.sendStatus(400).send('missing field');
                    }
                }
            }
        

            //check if all field is not empty
            if (!req.body.id||!req.body.name||!req.body.logo_picture||!req.body.director||!req.body.date||req.body.isSeries==="")
             {
                return res.sendStatus(400).send('missing field');
             }
            if(req.body.isSeries=="true")
            {
                if(!req.body.series_number)
                {
                    return res.sendStatus(400).send('missing field');
                }
            }

            //check if there is no unnecessary parameters
            if(req.body.isSeries=="true")
            {
                if(Object.keys(req.body).length>7)
                {
                    return res.sendStatus(400).send('There is unnecessary parameters');
                }  
            }
            else{
                if(Object.keys(req.body).length>6)
                {
                    return res.sendStatus(400).send('There is unnecessary parameters');
                } 
            }

            //check if the conference is already exist
            if(data[req.body.id])
            {
                return res.sendStatus(400).send('Conference is already exist');
            }
            data[req.body.id] = req.body;
            // delete data[req.body.id]['id'] ;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new conference added');
            });
        },
            true);
    },

    // UPDATE
    
 update_conference: function (req, res) {

        readFile(data => {
            // add the new conference
            const userId = req.params["id"];
            let all_fields_array=["id","name","logo_picture","director","date","isSeries","series_number"];
            let fields_enterd = Object.keys(req.body);
            for (let i=0;i<all_fields_array.length;i++)
            {
                if(all_fields_array[i]!=fields_enterd[i])
                {
                    if(req.body.isSeries=="false" && i==6)
                    {
                        console.log("bhubufr");
                        break;
                    }
                    else
                    {
                        console.log(all_fields_array[i]);
                        console.log(fields_enterd[i]);
                        console.log("else");
                        console.log(req.body.isSeries);
                        return res.sendStatus(400).send('missing field');
                    }
                }
            }

             //check if all field is not empty
             if (!req.body.id||!req.body.name||!req.body.logo_picture||!req.body.director||!req.body.date||req.body.isSeries==="")
             {
                return res.sendStatus(400).send('missing field');
             }
            if(req.body.isSeries=="true")
            {
                if(!req.body.series_number)
                {
                    return res.sendStatus(400).send('missing field');
                }
            }

            //check if there is no unnecessary parameters
            if(req.body.isSeries=="true")
            {
                if(Object.keys(req.body).length>7)
                {
                    return res.sendStatus(400).send('There is unnecessary parameters');
                }  
            }
            else{
                if(Object.keys(req.body).length>6)
                {
                    return res.sendStatus(400).send('There is unnecessary parameters');
                } 
            }

            if(userId!=req.body.id)
            {
                console.log("The conference ID cannot be updated");
                return res.sendStatus(400).send('The conference ID cannot be updated');
            }

            if (data[userId])
            {
                if(req.body.name==="")
                {
                    req.body.name = data[userId].name
                }
                data[userId] = req.body;
            }
            if (data[userId])
            {
                if(req.body.lectures)
                {
                    console.log("The conference lectures cannot be updated");
                    return res.sendStatus(400).send('The conference lectures cannot be updated');
                }
                data[userId] = req.body;
            }
            else  
            {
                console.log("The id is not exist");
                return res.sendStatus(400).send('The id is not exist');
            }
            // delete data[req.body.id]['id'] ;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    },

     // UPDATE
    add_lecture_to_conference: function (req, res) {

    readFile(data => {
        // add the new conference
         const userId = req.params["id"];
        // const userName = req.params["name"];
         const userName = req.body.name
        // const userName = req.params["name"];
         //check if all field is not empty
         let all_fields_array=["name","picture","site"];
         let fields_enterd = Object.keys(req.body);
         for (let i=0;i<all_fields_array.length;i++)
         {
             if(all_fields_array[i]!=fields_enterd[i])
             {
                if(i===2 && Object.keys(req.body).length===2)
                     {
                        if(Object.keys(req.body).length>2)
                        {
                            console.log("There is unnecessary parameters");
                            return res.sendStatus(400).send('There is unnecessary parameters');
                        }  
                        break;
                     }
                     if( Object.keys(req.body).length>=3)
                     {
                        console.log("2");
                        return res.sendStatus(400).send('There is unnecessary parameters');   
                     }
             }  
         }
         if (!req.body.name||!req.body.picture)
         {
            console.log("3");
            console.log(req.body.name);
            return res.sendStatus(400).send('missing field');
         }

         if(Object.keys(req.body).length>3)
         {
            console.log("4");
             return res.sendStatus(400).send('There is unnecessary parameters');
         }  
        // if(userId!=req.body.id)
        // {
        //     console.log("5");
        //     return res.sendStatus(400).send('The conference ID cannot be updated');
        // }
        if (data[userId])
        {
            if(data[userId].lectures)
            {
                if(data[userId].lectures[userName])
                {
                    console.log("6");
                    return res.sendStatus(400).send('The lectures is already exist');
                }
               
            }
          
                data[userId].lectures= {...data[userId].lectures,[userName]: req.body};
                // delete  data[userId].lectures[userName]["name"]
        }
        else   
        {
            console.log("7");
            return res.sendStatus(400).send('The id is not exist');
        }
       
       
        
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`users id:${userId} updated`);
        });
    },
        true);
},

    // DELETE
    delete_lecturer_from_conference: function (req, res) {
    const userId = req.params["id"];
    const userName = req.params["name"];
        readFile(data => {
            if(data[userId])
            {
                if(data[userId].lectures){

                if(data[userId].lectures[userName])
                {                   
                    
                        delete data[userId].lectures[userName];
                } 
            }
                else{
                    return res.sendStatus(400).send('The lectures is not exist');
                }
            }
        
            else{
                return res.sendStatus(400).send('The conference is not exist');
            }
            // add the new user
           
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    },
 // DELETE
 delete_conference: function (req, res) {
    const userId = req.params["id"];
    const userName = req.params["name"];
        readFile(data => {
            if(data[userId])
            {                                  
                        delete data[userId];
            }
                else{
                    return res.sendStatus(400).send('The conference is not exist');
                }
            // add the new user
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    }
};