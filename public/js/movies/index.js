document.addEventListener('DOMContentLoaded',function () {
    var deleteBtn = document.querySelector('#deleteBtn');
    deleteBtn.addEventListener('click',function (e) {
        e.preventDefault();
        var id = e.target.getAttribute('data-id');
        axios.delete('/movies/' + id + '/delete').then(function (response) {
            if (response.status == 200) {
                window.location = '/movies';
            }
        });
    });
});