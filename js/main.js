$( document ).ready(function(){

	//COLLABORATION

	//slider show more show less
	setupExpandy();
	setupNavigation();
});

function setupNavigation() {
	/*
	 * This uses the accessible-navigation.js plugin
	 * which exposes setup_navigation() fn for
	 * jQuery elements
	 */
	$('nav > ul').setup_navigation({
		menuHoverClass: 'showMenu'
	});
};


function setupExpandy() {
	//What is it?
	$('.toggle').click(function(e) {
		// "this" refers to the "a" that was clicked
		e.preventDefault();

		var contentId = $(this).attr('aria-controls');

		// Find all elements that control this element
		var $toggleControls = $('[aria-controls=' + contentId + ']');
		// Gets the current value for aria-expanded off of the toggle links
		var currentAriaExpandedState = JSON.parse($toggleControls.attr('aria-expanded'));
		// Set the next state to be the oppositive of what it is currently
		var nextExpandedState = !currentAriaExpandedState;

		// Find the content that should be shown/hidden
		// slideToggle() knows to either expand or collapse
		$('#' + contentId).slideToggle({
			// Once the animation completes, fun this function
			complete: function() {
				// "this" refers to the element we just expanded/collapsed via slideToggle()
				// save it as a variable called "$content"
				var $content = $(this);

				// Get the current aria-hidden state for this element
				var currentAriaHiddenState = JSON.parse($(this).attr('aria-hidden'));
				// The next state is the inverse of the current state
				var nextAriaHiddenState = !currentAriaHiddenState;
				// Update the $content to have the next state
				$content.attr('aria-hidden', nextAriaHiddenState);

				// And finally update the links that control the hiding/showing to have the correct
				// aria-expanded state
				$toggleControls.attr('aria-expanded', nextExpandedState);

				if (nextExpandedState) {
					// Put focus on the content once its exapnded
					$content.attr('tabIndex', -1);
					$content[0].focus();
				} else {
					// Put focus back at title link
					$toggleControls.eq(0)[0].focus();
				}
			}
		});
	});
}
