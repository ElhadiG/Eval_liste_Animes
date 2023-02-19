const fs = require('fs');
const path = "./src/model/animes.json";

exports.getAll=(request,response) => {
    fs.readFile(path, (err,data) => {
        if (err){
            response.status(500).json({
                message:"Erreur lors de la lecture du fichier",
                error:err
            });
        } else {
            response.status(200).json(JSON.parse(data).upcoming);
        };
    });
};

exports.createData= (request,response) => {
    fs.readFile(path, (err, data) => {
        if(err){
            response.status(500).json({
                message:"Erreur lors de la lecture du fichier",
                error:err
            })
        } else{
            console.log("toto", request.body);
            const allParsedData= JSON.parse(data);
            //enregistre le tableau upcoming seulement
            const upcomingAnimes = allParsedData.upcoming
            //crée un tableau d'id grace a map
            const upcomingAnimeIds= upcomingAnimes.map((obj)=> obj.id)
            //math.max prend l'id le plus grand 
            const maxId= Math.max(...upcomingAnimeIds)
            //je rajoute +1 a la valeur de l'id stocké
            const newId= maxId+1
            // const tri=
            //rajouter cette donnée a partir de ce qu'on a ecrit dans le body
            allParsedData.upcoming.push({
                "id":newId,
                "name": request.body.name,
                "year": request.body.year
            })
            fs.writeFile(path,JSON.stringify(allParsedData),(writeErr) => {
                if (writeErr){
                    response.status(404).json({
                        message:"Erreur lors de l'écriture",
                        error:err
                    })
                } else {
                    response.status(200).json({
                        message:"Data ajoutée avec succès"
                    })
                }
            })
        }
    })
}
exports.deleteData=(request, response)=>{
    //lecture du fichier
    fs.readFile(path,(err,data)=>{
        if (err){  //si erreur renvoie status 500 + message d'erreur
            response.status(500).json({
                message:"Erreur lors de la lecture ",
                error:err
        })
        } else{
        //stocker les données existantes
            const allParsedData=JSON.parse(data);
            //chercher la donnée avec l'id passé en param
            const animeToDelete= allParsedData.upcoming.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
        if(!animeToDelete){
            //Erreur 404+ message d'erreur
            response.status(404).json({
                message:"id non trouvé avec cet objet",
                error:err
            })
    }   else{
            //Réassigne la donnée existante avec le param null pour ecrasé
            allParsedData.upcoming=allParsedData.upcoming.filter(
                (obj)=> obj.id != parseInt(request.params.id));
            //filtre le fichier et réecrit avec le param null
            fs.writeFile(path ,JSON.stringify(allParsedData),
                (writeErr)=>{
                    if (writeErr) {
                        //si erreur renvoie status 500 + message d'erreur
                        response.status(500).json({
                            message:"Erreur lors de la suppression",
                            error:err
                        })
                    }   else {
                        //sinon status 200+message reussite
                            response.status(200).json({
                                message:"SIUpression reussie"
                        })
                    }
                })
            }
        }
    })
}
exports.getById=(request,response) =>{
    //lecture du fichier pokedex.json 
    fs.readFile(path ,(err,data)=>{
        //condition si erreur
        if (err){
            // renvoie status 500 + message d'erreur
            response.status(500).json({
                message:"Erreur pas trouvé d'id",
                error: err
            })
        } else {
            //transforme la data en jSON manipulable 
            const allParsedData= JSON.parse(data);
            //Recherche dans le fichier si l'id de la route est présente dans le fichier
            const anime= allParsedData.upcoming.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si on trouve cet id
            if (anime){
                //renvoi la reponse avec un status 200 et l'objet
                response.status(200).json(anime)
            } else{
                //sinon renvoie un status 404
                response.status(404).json({
                    message:"id non trouvé avec cet objet",
                    error:err
                })
            }
        }   
    })
}
exports.updateData= (request, response) => {
    // Lecture du fichier 
    fs.readFile(path, (err,data)=>{
        // Condition erreur de lecture (500)
        if (err) {
            // Afficher message et erreur
            response.status(500).json({
                message : "Erreur de lecture",
                error: err,
            })
            // Sinon
        } else {
            // Stocker les données existantes
            const allParsedData = JSON.parse(data);
            // Rechercher via l'id si parametre existant
            const anime= allParsedData.upcoming.find(
            //find recupere et retourne le premier element du tableau qui retourne true pour la condition passée en param
            // ca va chercher dans mon url si le numero passé en param est un id d'un objet contenu dans le tableau
            (obj) => obj.id === parseInt(request.params.id));
            // condition si on trouve pas l'objet avec l'id
            if (!anime) {
            // Reponse avec statut erreur 404
                response.status(404).json({
            // Message erreur recherche 
                    message: "Aucun objet avec cet id ! WHY?",
                    error: err,
            })
            // 'Sinon' on trouve l'objet donc ->
            } else {
                // La nouvelle donnée sera la requete executée dans le body thunder 
                anime.name=request.body.name;
                anime.year=request.body.year;
                // Réecriture de la donnée et sauvegarde
                fs.writeFile(path, JSON.stringify(allParsedData),(writeErr) => {
                // Si Erreur reponse 500 avec message
                    if (writeErr) {
                        response.status(500).json({
                            message: "Erreur lors de la réecriture try again !",
                            error: err
                        })
                    // sinon status 200 succes message 
                    } else {
                        response.status(200).json({
                        message: "Réecriture accomplie avec succès"
                        })
                    }
                })
            }   
        }
    })
}