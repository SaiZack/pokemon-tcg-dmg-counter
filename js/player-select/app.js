import { playerRepo } from '../../class/PlayerRepo.js';

$(document).ready(function () {
    const players = playerRepo.getAllPlayers()
    $.each(players, function (index, data) {
        $('.player-name').append($('<option>', {
            value: data.id,
            text: data.name
        }));
    });

    $('.player-name').each(function(){
        var $this = $(this);
        $this.select2({
            allowClear: true,
            theme: 'bootstrap4',
            maxInput: 1,
            minimumInputLength: 1,
            language: {
                noResults: function () {
                    const button = $('<button style="width: 100%" type="button" class="btn btn-primary btn-sm">+</button>');
                    button.on('click', function () {
                        addNewPlayer($this);
                    });
                    return button;
                },
            }
        })
    })
    function addNewPlayer(ele){
        const player_name =  $('.select2-search__field').val()
        const new_player = playerRepo.createPlayer(player_name)
        const selected = $("<option selected='selected'></option>").val(new_player.id).text(new_player.name);
        ele.append(selected).trigger('change');
        ele.select2("close")
    }
})

