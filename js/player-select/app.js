import { playerRepo } from '../../class/PlayerRepo.js';
import { matchRepo } from '../../class/MatchRepo.js';
import { battleRepo } from '../../class/BattleRepo.js';

$(document).ready(function () {
    const players = playerRepo.getAllPlayers()    
    $.each(players, function (index, data) {
        const winRate = data.totalPlay === 0 ? 0 : (data.winCount / data.totalPlay) * 100;
        $('.player-name').append($('<option>', {
            value: data.id,
            text: `${data.name} (${winRate.toFixed(2) + '%'})`
        }));
    });

    $('.player-name').each(function () {
        var $this = $(this);
        $this.select2({
            theme: 'bootstrap4',
            maxInput: 1,
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
    function addNewPlayer(ele) {
        const player_name = $('.select2-search__field').val()
        const new_player = playerRepo.createPlayer(player_name)
        const selected = $("<option selected='selected'></option>").val(new_player.id).text(`${new_player.name} (0.00%)`);
        ele.append(selected).trigger('change');
        ele.select2("close")
    }

    // $('#start').hide();
    $('.player-name').change(function () {
        const selectValues = $('.player-name').map(function () {
            return $(this).val();
        }).get();

        const areAllSame = selectValues.every(function (value, index, array) {
            return value === array[0];
        });

        if (areAllSame || selectValues.includes('')) {
            $('#start').hide();
        } else {
            $('#start').show();            
        }
    });

    $('#skip').click(function () {
        const match = matchRepo.createMatch()
        $('.player-name').each(function () {
           battleRepo.createBattle(match.id, this.value, this.name)
        })
        const url = `battle-field.html?matchId=${encodeURIComponent(match.id)}`;
        $(location).attr('href', url);
    })
})

