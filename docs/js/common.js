$(function () {
	//SVG Fallback
	if (!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function () {
			return $(this).attr("src").replace(".svg", ".png");
		});
	}

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function () {
		//Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize(),
		}).done(function () {
			alert("Thank you!");
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	let header = document.querySelector(".header");
	document.addEventListener("scroll", () => {
		const winScrollTop = $(".content").offset().top;
		console.log(winScrollTop);
		// winScrollTop > 0 && header.classList.contains("fullheight")
		// 	? header.classList.remove("fullheight")
		// 	: header.classList.add("fullheight");
	});
});
