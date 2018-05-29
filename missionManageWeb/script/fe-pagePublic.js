(function($){
	/*svg*/
	var svgHtmlList=[
		'<svg width="80" height="80" viewBox="0 0 45 45" stroke="#fff">'+
		    '<g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">'+
		        '<circle cx="22" cy="22" r="6.43183" stroke-opacity="0">'+
		            '<animate attributeName="r" begin="1s" dur="1s" values="6;22" calcMode="linear" repeatCount="indefinite"/>'+
		            '<animate attributeName="stroke-opacity" begin="1s" dur="1s" values="1;0" calcMode="linear" repeatCount="indefinite"/>'+
		            '<animate attributeName="stroke-width" begin="1s" dur="1s" values="2;0" calcMode="linear" repeatCount="indefinite"/>'+
		        '</circle>'+
		        '<circle cx="22" cy="22" r="14.4318" stroke-opacity="0">'+
		            '<animate attributeName="r" begin="2s" dur="2s" values="6;22" calcMode="linear" repeatCount="indefinite"/>'+
		            '<animate attributeName="stroke-opacity" begin="2s" dur="2s" values="1;0" calcMode="linear" repeatCount="indefinite"/>'+
		            '<animate attributeName="stroke-width" begin="2s" dur="2s" values="2;0" calcMode="linear" repeatCount="indefinite"/>'+
		        '</circle>'+
		        '<circle cx="22" cy="22" r="4.38064">'+
		            '<animate attributeName="r" begin="0s" dur="1s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite"/>'+
		       '</circle>'+
		    '</g>'+
		'</svg>',
		'<svg width="46" height="46" viewBox="0 0 38 38" stroke="#fff">'+
		    '<g fill="none" fill-rule="evenodd">'+
		        '<g transform="translate(1 1)" stroke-width="2">'+
		            '<circle stroke-opacity=".5" cx="18" cy="18" r="18"/>'+
		            '<path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(337.033 18 18)">'+
		                '<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>'+
		            '</path>'+
		        '</g>'+
		    '</g>'+
		'</svg>',
		'<svg width="80" height="28" viewBox="0 0 120 30" fill="#fff">'+
		    '<circle cx="15" cy="15" r="10.0207">'+
		        '<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/>'+
		        '<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="60" cy="15" r="13.9793" fill-opacity="0.3">'+
		        '<animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"/>'+
		        '<animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="105" cy="15" r="10.0207">'+
		        '<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/>'+
		        '<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		'</svg>',
		'<svg width="60" height="60" viewBox="0 0 44 44" stroke="#fff">'+
		    '<g fill="none" fill-rule="evenodd" stroke-width="2">'+
		        '<circle cx="22" cy="22" r="18.7381">'+
		            '<animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>'+
		            '<animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>'+
		        '</circle>'+
		        '<circle cx="22" cy="22" r="4.76424">'+
		            '<animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>'+
		            '<animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>'+
		        '</circle>'+
		    '</g>'+
		'</svg>',
		'<svg width="60" height="60" viewBox="0 0 135 135" fill="#fff">'+
		    '<path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z" transform="rotate(-315.64 67 67)">'+
		        '<animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite"/>'+
		    '</path>'+
		    '<path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z" transform="rotate(323.637 67.0001 67)">'+
		        '<animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite"/>'+
		    '</path>'+
		'</svg>',
		'<svg width="57" height="57" viewBox="0 0 57 57" stroke="#fff">'+
		    '<g fill="none" fill-rule="evenodd">'+
		        '<g transform="translate(1 1)" stroke-width="2">'+
		            '<circle cx="8.07018" cy="50" r="5">'+
		                '<animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"/>'+
		                '<animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"/>'+
		            '</circle>'+
		            '<circle cx="25.4649" cy="8.13995" r="5">'+
		                '<animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"/>'+
		                '<animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"/>'+
		            '</circle>'+
		            '<circle cx="47.4649" cy="46.86" r="5">'+
		                '<animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"/>'+
		                '<animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"/>'+
		            '</circle>'+
		        '</g>'+
		    '</g>'+
		'</svg>',
		'<svg width="60" height="60" viewBox="0 0 38 38">'+
		    '<defs>'+
		        '<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">'+
		            '<stop stop-color="#fff" stop-opacity="0" offset="0%"/>'+
		            '<stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>'+
		            '<stop stop-color="#fff" offset="100%"/>'+
		        '</linearGradient>'+
		    '</defs>'+
		    '<g fill="none" fill-rule="evenodd">'+
		        '<g transform="translate(1 1)">'+
		            '<path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2" transform="rotate(42.7627 18 18)">'+
		                '<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>'+
		            '</path>'+
		            '<circle fill="#eee" cx="36" cy="18" r="1" transform="rotate(42.7627 18 18)">'+
		                '<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>'+
		            '</circle>'+
		        '</g>'+
		    '</g>'+
		'</svg>',
		'<svg width="80" height="58" viewBox="0 0 135 140" fill="#fff">'+
		    '<rect y="14.8812" width="15" height="110.238" rx="6">'+
		        '<animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>'+
		        '<animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>'+
		    '</rect>'+
		    '<rect x="30" y="27.3812" width="15" height="85.2376" rx="6">'+
		        '<animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>'+
		        '<animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>'+
		    '</rect>'+
		    '<rect x="60" width="15" height="60.2376" rx="6" y="39.8812">'+
		        '<animate attributeName="height" begin="0s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>'+
		        '<animate attributeName="y" begin="0s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>'+
		    '</rect>'+
		    '<rect x="90" y="27.3812" width="15" height="85.2376" rx="6">'+
		        '<animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>'+
		        '<animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>'+
		    '</rect>'+
		    '<rect x="120" y="14.8812" width="15" height="110.238" rx="6">'+
		        '<animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>'+
		        '<animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>'+
		    '</rect>'+
		'</svg>',
		'<svg width="58" height="58" viewBox="0 0 58 58">'+
		    '<g fill="none" fill-rule="evenodd">'+
	        '<g transform="translate(2 1)" stroke="#FFF" stroke-width="1.5">'+
	            '<circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="#fff">'+
	                '<animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="1;0;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"/>'+
	            '</circle>'+
	            '<circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="#fff">'+
	                '<animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;1;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"/>'+
	            '</circle>'+
	            '<circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="#fff">'+
	                '<animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;1;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"/>'+
	            '</circle>'+
	            '<circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="#fff">'+
	                '<animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;1;0;0;0;0" calcMode="linear" repeatCount="indefinite"/>'+
	            '</circle>'+
	            '<circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="#fff">'+
	                '<animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;1;0;0;0" calcMode="linear" repeatCount="indefinite"/>'+
	            '</circle>'+
	            '<circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="#fff">'+
	                '<animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;1;0;0" calcMode="linear" repeatCount="indefinite"/>'+
	            '</circle>'+
	            '<circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="#fff">'+
	                '<animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;1;0" calcMode="linear" repeatCount="indefinite"/>'+
	            '</circle>'+
	            '<circle cx="27" cy="5" r="5" fill-opacity="0" fill="#fff">'+
	                '<animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;0;1" calcMode="linear" repeatCount="indefinite"/>'+
	            '</circle>'+
	        '</g>'+
    	'</g>'+
		'</svg>',
		'<svg width="58" height="58" viewBox="0 0 105 105" fill="#fff">'+
		    '<circle cx="12.5" cy="12.5" r="12.5">'+
		        '<animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5">'+
		        '<animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="52.5" cy="12.5" r="12.5">'+
		        '<animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="52.5" cy="52.5" r="12.5">'+
		        '<animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="92.5" cy="12.5" r="12.5">'+
		        '<animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="92.5" cy="52.5" r="12.5">'+
		        '<animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="12.5" cy="92.5" r="12.5">'+
		        '<animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="52.5" cy="92.5" r="12.5">'+
		        '<animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		    '<circle cx="92.5" cy="92.5" r="12.5">'+
		        '<animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>'+
		    '</circle>'+
		'</svg>',
		'<svg version="1.1" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 24 30">\n\t\t    <rect x="0" y="6.5799" width="4" height="16.8402" fill="#fff" opacity="0.2">\n\t\t\t    <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t\t    <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t\t    <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t    </rect>\n\t\t    <rect x="8" y="9.0799" width="4" height="11.8402" fill="#fff" opacity="0.2">\n\t\t\t    <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t\t    <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t\t    <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t    </rect>\n\t\t    <rect x="16" y="8.4201" width="4" height="13.1598" fill="#fff" opacity="0.2">\n\t\t\t    <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t\t    <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t\t    <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t    </rect>\n  \t\t</svg>',
		'<svg version="1.1" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 24 30">\n    \t\t<rect x="0" y="8.86118" width="4" height="13.2776" fill="#FFF">\n      \t\t\t<animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>\n      \t\t\t<animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>\n    \t\t</rect>\n    \t\t<rect x="10" y="12.8612" width="4" height="5.27765" fill="#FFF">\n      \t\t\t<animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>\n      \t\t\t<animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>\n    \t\t</rect>\n\t\t    <rect x="20" y="9.13882" width="4" height="12.7224" fill="#FFF">\n\t\t      <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t      <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>\n\t\t    </rect>\n  \t\t</svg>',
		'<svg version="1.1" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 24 30">\n\t    \t<rect x="0" y="0" width="4" height="10" fill="#FFF" transform="translate(0 15.2085)">\n\t      \t\t<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"></animateTransform>\n\t    \t</rect>\n\t    \t<rect x="10" y="0" width="4" height="10" fill="#FFF" transform="translate(0 11.4581)">\n\t      \t\t<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"></animateTransform>\n\t    \t</rect>\n\t    \t<rect x="20" y="0" width="4" height="10" fill="#FFF" transform="translate(0 1.87518)">\n\t      \t\t<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"></animateTransform>\n\t    \t</rect>\n\t  \t</svg>',
		'<svg version="1.1" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 50 50">\n  \t\t<path fill="#FFF" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(173.123 25 25)">\n   \t\t\t<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>\n    \t</path>\n    </svg>',
		'<svg version="1.1" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 50 50">\n  \t\t<path fill="#FFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(33.1231 25 25)">\n    \t\t<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>\n    \t</path>\n  \t</svg>',
		'<svg version="1.1" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 40 40">\n  \t\t<path opacity="0.2" fill="#FFF" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\n    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\n    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>\n  \t\t<path fill="#FFF" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\n    C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(3.74758 20 20)">\n   \t\t\t<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>\n    \t</path>\n  \t</svg>'
	];
	function extendClass(subClass,superClass){
		var F=function(){};
		F.prototype=superClass.prototype;
		subClass.prototype=new F();
		subClass.prototype.constructor=subClass;
		subClass.superClass=superClass.prototype;
		if(superClass.prototype.constructor===Object){
			superClass.prototype.constructor=superClass;
		}
	}
	function protoCopy(P){
		var F=function(){};
		F.prototype=P;
		return new F();
	}
	function random(m,n){
		return Math.floor(m+Math.random()*(n-m));
	};
	var animateInArr=['flipInX','flipInY','zoomIn','zoomInUp','zoomInRight','zoomInDown','zoomInLeft'];
	var animateOutArr=['flipOutX','flipOutY','zoomOut','zoomOutUp','zoomOutRight','zoomOutDown','zoomOutLeft'];
	/*页面打开的时候*/
	var dsOpenLoading=(function($){
		function openLoading(){
			this.txt='正在加载';
			this.type=1;
			this.imgLoadedCount=0;
			this.imgErrorCount=0;
			this.dsLoadingFlag=null;
			this.loadingBox=$('.js_ds-loadingBox');
			this.initClass='';  //初始类名
			this.html='<div class="ds-loadingBox js_ds-loadingBox animated">'+
							'<div class="ds-loader-container animated">'+
								'<div class="ds-svg-container">'+svgHtmlList[this.type]+'</div>'+
								'<p class="ds-loader-txt">'+this.txt+'</p>'+
			    			'</div>'+
						'</div>';
		}
		openLoading.prototype={
			constructor:openLoading,
			_show:function(opt){
				if(this.dsLoadingFlag){
					this.dsLoadingFlag=null;
					this.destroy();
					return;
				}
				$('body').addClass('hideScroll');
				this.dsLoadingFlag='created';
				if($.isPlainObject(opt)&&!$.isEmptyObject(opt)){
					this.type=parseInt(opt.type);
					this.txt=opt.txt||'正在加载';
				}
				var randomClass=animateInArr[random(0,animateInArr.length)];
				$(this.html).find('.ds-loader-txt').text(this.txt).end().find('.ds-svg-container').html(svgHtmlList[this.type]).end().children('.ds-loader-container').addClass(randomClass).end().appendTo('body');
				this.initClass=randomClass;
				return this;
			},
			_hide:function(fn){
				if(fn&&$.type(fn)!=='function'){
					console.warn('function');
					return;
				}
				var index=random(0,3);
				var plTimer=setTimeout($.proxy(function(){
					clearTimeout(plTimer);
					this.destroy();
					var feContainer=$('.js_fe-container');
					if(feContainer.css('display')==='none'){
						feContainer.css('display','block').addClass('zoomIn');
					}
					fn&&fn();
				},this),600);
				return this;
			},
			afterImgsLoaded:function(fn){  
				var that=this;
				var loadImgs=$('.js_loadImg','.js_fe-container');  //需要动态添加src的图片
				var imgLength=loadImgs.length;
				var loadedCount=0;
				var errCount=0;
				if(imgLength>0){  /*背景图片加载完*/
					$.when((function(){
						var dfd=$.Deferred();
						loadImg(loadImgs);
						//递归加载图片
						function loadImg(imgArr){
							var src=imgArr.eq(loadedCount).attr('data-src');
							imgArr.eq(loadedCount).attr('src',src).on('load',function(){
								loadedCount++;
								if(loadedCount>=imgArr.length){
									if(errCount>0){
										dialog.init({
											content:'有'+errCount+'张图片加载失败！'
										});
									}
									dfd.resolve();
									return;
								}
								loadImg(imgArr);
							}).on('error',function(){
								loadedCount++;
								errCount++; //
								if(loadedCount>=imgArr.length){
									if(errCount>0){
										dialog.init({
											content:'有'+errCount+'张图片加载失败！'
										});
									}
									dfd.reject();
									return;
								}
								loadImg(imgArr);
							});
						}
						return dfd;
					})()).done(function(){
						that._hide(fn);
					}).fail(function(){
						that._hide(fn);
					});
				}else{
					this._hide(fn);
				}
				return this;
			},
			destroy:function(){
				var randomClass=animateOutArr[random(0,animateOutArr.length)];
				$('.js_ds-loadingBox','body').fadeOut(1200,function(){
					$(this).remove();
				}).children('.ds-loader-container').removeClass(this.initClass).addClass(randomClass);
				$('body').removeClass('hideScroll');
				return this;
			}
		};
		return openLoading;
	})($);
	/*弹窗*/
	var dsDialog=(function($){
		var oldDsDialog;
		function Dialog(){
			this.timer=null;
			this.dialogBody=null;
		}
		Dialog.prototype={
			constructor:Dialog,
			init:function(config){
				config=config||{};
				this.type=config.type||1;
				this.title=config.title||'提示';
				this.content=config.content||'这是弹窗内容';
				this.popInAnimes=['flipInX','flipInY','zoomIn','bounceIn','rollIn'];
				this.popOutAnimes=['flipOutX','flipOutY','zoomOut','bounceOut','rollOut'];
				this.html='<div class="js_dialog">'+
		            '<div class="weui-mask"></div>'+
		            '<div class="weui-dialog animated">'+
		            	'<div class="weui-dialog__hd"><strong class="weui-dialog__title">'+this.title+'</strong></div>'+
		                '<div class="weui-dialog__bd">'+this.content+'</div>'+
		                '<div class="weui-dialog__ft">'+
		                    '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>'+
		                '</div>'+
		            '</div>'+
		        '</div>';
				this.html2='<div class="js_dialog">'+
		            '<div class="weui-mask"></div>'+
		            '<div class="weui-dialog animated">'+
		                '<div class="weui-dialog__hd"><strong class="weui-dialog__title">'+this.title+'</strong></div>'+
		                '<div class="weui-dialog__bd">'+this.content+'</div>'+
		                '<div class="weui-dialog__ft">'+
		                    '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">取消</a>'+
		                    '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>'+
		                '</div>'+
		            '</div>'+
		        '</div>';
				var dfd=$.Deferred();
				return $.when(this.show(dfd));
			},
			show:function(dfd){
				if(oldDsDialog){
					this.destroy();
				}
				oldDsDialog=this;
				switch(this.type){
					case 2:
						$('body').append(this.html2);
						var inClass=this.popInAnimes[random(0,this.popInAnimes.length)];
						$('.weui-dialog','.js_dialog').addClass(inClass);
						$('a.weui-dialog__btn_primary','.js_dialog').on('click touchstart',$.proxy(function(ev){
							var outClass=this.popOutAnimes[random(0,this.popOutAnimes.length)];
							var $this=$(ev.currentTarget);
							$this.closest('.weui-dialog').removeClass(inClass).addClass(outClass);
							this.timer=setTimeout($.proxy(function(){
								clearTimeout(this.timer);
								dfd.resolve();
								this._hide();
							},this),600);
						},this));
						$('a.weui-dialog__btn_default','.js_dialog').on('click touchstart',$.proxy(function(ev){
							var outClass=this.popOutAnimes[random(0,this.popOutAnimes.length)];
							var $this=$(ev.currentTarget);
							$this.closest('.weui-dialog').removeClass(inClass).addClass(outClass);
							this.timer=setTimeout($.proxy(function(){
								clearTimeout(this.timer);
								dfd.reject();
								this._hide();
							},this),600);
						},this));
						break;
					default:
						$('body').append(this.html);
						var inClass=this.popInAnimes[random(0,this.popInAnimes.length)];
						$('.weui-dialog','.js_dialog').addClass(inClass);
						$('a.weui-dialog__btn_primary','.js_dialog').on('click',$.proxy(function(ev){
							var outClass=this.popOutAnimes[random(0,this.popOutAnimes.length)];
							var $this=$(ev.currentTarget);
							$this.closest('.weui-dialog').removeClass(inClass).addClass(outClass);
							this.timer=setTimeout($.proxy(function(){
								clearTimeout(this.timer);
								dfd.resolve();
								this._hide();
							},this),600);
						},this));
						break;
				}
				return dfd.promise();
			},
			_hide:function(){
				this.detach();
			},
			detach:function(){
				$('.js_dialog').css('display','none');
			},
			destroy:function(){
				$('a.weui-dialog__btn_default').off('click');
				$('a.weui-dialog__btn_primary').off('click');
				$('.js_dialog').remove();
				oldDsDialog=null;
			}
		};
		return Dialog;
	})($);
	/*等待操作的时候*/
	var dsWaitOperate=function(){
		dsOpenLoading.call(this);
	};
	extendClass(dsWaitOperate,dsOpenLoading); //继承
	var dsWaitOperate=new dsWaitOperate();
	/*移动端设置html的font-size*/
	var setRem=(function(){
	    var docEle=window.document.documentElement;
	    var tid=null;
	    function refreshRem(){
	        var width = docEle.getBoundingClientRect().width;
	        var rem = width / 10;
	        if(rem>=76.8){
	            rem=76.8;
	        }
	        docEle.style.fontSize = rem + 'px';
	    }
	    return function(){
	        window.addEventListener('resize', function() {
	            clearTimeout(tid);
	            tid = setTimeout(refreshRem, 300);
	        }, false);
	        document.addEventListener('DOMContentLoaded', function() {
	            clearTimeout(tid);
	            tid = setTimeout(refreshRem, 300);
	        }, false);
	        refreshRem();
	    };
	})();
	/*导出*/
	var dsOpenLoading=new dsOpenLoading();
	var dialog=new dsDialog();
	window.fe={
		openLoad:dsOpenLoading,  /*opt.type   opt.txt  .js_loadImg data-src*/
		dialog:function(config){      /*opt.type opt.title   opt.content*/
			return dialog.init(config);
		},
		waitLoad:dsWaitOperate,  /*opt.type   opt.txt*/
		setRem:setRem
	};
})(jQuery);
