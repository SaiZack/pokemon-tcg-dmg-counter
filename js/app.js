$(document).ready(function () {

    $('[data-bs-toggle="tooltip"]').each(function () {
        $(this).tooltip({
            delay: { "show": 500, "hide": 0 }
        });
    });
    
    // const v = $('#v_modal');
    // const s = $('#s_modal');

    // v.on('show.bs.modal', function (event) {
    //     btn = $(event.relatedTarget).find('.poke-name');
    //     place = $(event.relatedTarget).attr('id')
    //     if (btn.text() == '') {
    //         addForm(v, place)
    //     } else {
    //         modal_title.text(btn.text())
    //     }
    // });

    // $('.add-btn').click(function(){
    //     id = $(this).data('place');
    //     console.log(id)
    // })

    // s.on('show.bs.modal', function (event) {
    //     btn = $(event.relatedTarget).find('.poke-name');
    //     modal_title = s.find('.modal-title')
    //     modal_title.text(btn.text())
    // });

    // $('.modal').on('hide.bs.modal', function (e){
    //     select = $(this).find('.select2').val(null)
    //     select.trigger('change')
    //     $(this).find('input').val(null)
    // })

    // var select2 = $('.select2');

    // $.ajax({
    //     url: "https://pokeapi.co/api/v2/pokemon?limit=2023&offset=0",
    //     method: "GET",
    //     dataType: "json",
    //     success: function(data) {
    //         $.each(data.results, function(index, optionData) {
    //             select2.append($('<option>', {
    //                 value: optionData.url,
    //                 text: optionData.name
    //             }));
    //         });

    //         select2.select2({
    //             width: '100%',
    //             dropdownParent: select2.parent(),
    //             cache: true,
    //             allowClear: true,
    //             language: {
    //                 noResults: function () {
    //                     return $(`<button style='width: 100%' type='button' 
    //                 class='btn btn-primary' onClick='addNewOption(this)'>
    //                 +</button>`);
    //                 },
    //             }
    //         });
    //     },
    //     error: function(xhr, status, error) {
    //         console.error(status + ": " + error);
    //     }
    // });

    // select2.on('change', function(){
    //     api = $(this).val();
    //     $.ajax({
    //         url: api,
    //         method: "GET",
    //         dataType: "json",
    //         success: function(data) {
    //             $('#v_img').attr('src', data.sprites.front_default)
    //         },
    //         error: function(xhr, status, error) {
    //             $('#v_img').attr('src', 'img/logo.png')
    //         }
    //     });
    // })
});
