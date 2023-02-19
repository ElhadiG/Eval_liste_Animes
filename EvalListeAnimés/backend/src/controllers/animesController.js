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
            response.status(200).json(JSON.parse(data));
        };
    });
};
