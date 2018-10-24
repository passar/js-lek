$( document ).ready(function() {
    $("a").addClass( "test" )
    $("a").click(function( event ) {
        console.log("länkar går ingenstans längre")

        event.preventDefault()

        $( this ).hide( "slow" )

        }
    })
})
