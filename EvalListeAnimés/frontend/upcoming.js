        $(document).ready(() => {
            const apiBaseUrl= "http://localhost:3100/"
            
            function addAnime() {
                const animeName = $("#add-anime").val() ;
                const addYear = $("#add-year").val() ;
                const data = {name: animeName, year: addYear}

                $.ajax({
                    type: "POST",
                    url: apiBaseUrl + 'upcoming',
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=UTF-8",
                    dataType: 'json',
                    success: () => {
                        getAnimes();
                    },
                    error: (xhr, status, error) => {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        alert("status: "+ status + "error: " + error)
                    }
                })
            }
            
            function getAnimes() {

                $.ajax({
                    type: "GET",
                    url: apiBaseUrl + 'upcoming',
                    contentType: "application/json; charset=UTF-8",
                    dataType: 'json',
                    success: (result) => {
                        let html = '';
                        result.forEach(obj => {
                            html += '<p>id: ' + obj.id + ' Nom: ' + obj.name + ' Année de sortie: ' + obj.year + '</p>';
                        })
                        $("#all-animes").html(html)
                    },
                    error: (xhr, status, error) => {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        alert("status: "+ status + "error: " + error)
                    }
                })
            }

            function getAnimeById() {
                const id = $("#id-anime").val();

                $.ajax({
                    type: "GET",
                    url: apiBaseUrl + 'upcoming/'+ id,
                    contentType: "application/json; charset=UTF-8",
                    dataType: 'json',
                    success: (result) => {
                        let html = '';
                            html += '<p>id: ' + result.id + ' Nom: ' + result.name + ' Année de sortie: ' + result.year + '</p>';
                        $("#one-anime").html(html)
                    },
                    error: (xhr, status, error) => {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        alert("status: "+ status + "error: " + error)
                    }
                })
            }

            function updateAnimeById() {
                const id = $("#id-anime-update").val();
                const animeName = $("#anime-update").val();
                const year = $("#year-update").val();
                const data = {name: animeName, year: year}

                $.ajax({
                    type: "PUT",
                    url: apiBaseUrl + 'upcoming/'+ id,
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(data),
                    dataType: 'json',
                    success: () => {
                        getAnimes();
                    },
                    error: (xhr, status, error) => {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        alert("status: "+ status + "error: " + error)
                    }
                })
            }

            function deleteAnimeById() {
                const id = $("#delete-anime").val();

                $.ajax({
                    type: "DELETE",
                    url: apiBaseUrl + 'upcoming/'+ id,
                    contentType: "application/json; charset=UTF-8",
                    dataType: 'json',
                    success: () => {
                        getAnimes();
                    },
                    error: (xhr, status, error) => {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        alert("status: "+ status + "error: " + error)
                    }
                })
            }
            $("#add-button").click(addAnime);
            $("#getAll-button").click(getAnimes);
            $("#getOne-button").click(getAnimeById);
            $("#update-button").click(updateAnimeById);
            $("#delete-button").click(deleteAnimeById);
        });