var ClownzanoAlert = (function() {
	function init() {
		
		var fragment = document.createDocumentFragment(),
				modal    = document.createElement('div'),
				content  = document.createElement('div'),
				h3       = document.createElement('h3'),
				h3Txt    = document.createTextNode('Clown Alert!'),
				innerDiv = document.createElement('div'),
				mTitle   = document.createElement('p'),
				titleTxt = document.createTextNode('Uh oh, you\'ve clicked on a link to a Clownzano article'),
				list     = document.createElement('ul'),
				line1    = document.createElement('li'),
				line1btn = document.createElement('button'),
				btn1txt  = document.createTextNode('No Way!'),
				line1p   = document.createElement('p'),
				line1txt = document.createTextNode('I absolutely don\'t want to lend my eyeballs to his garbage'),
				line2    = document.createElement('li'),
				line2btn = document.createElement('button'),
				btn2txt  = document.createTextNode('I know!'),
				line2p   = document.createElement('p'),
				line2txt = document.createTextNode('I really do want to see what this self-righteous nitwit has written'),
				img      = document.createElement('img'),
				overlay  = document.createElement('div');
				
		modal.classList.add('clownzano-modal');
		content.classList.add('clownzano-content');
		line1btn.classList.add('clownzano-close');
		line2btn.classList.add('clownzano-ok');
		img.src = chrome.extension.getURL('/clowncartoon.png');
		img.classList.add('clownzano-img');
		overlay.classList.add('clownzano-overlay');
		
		line1btn.appendChild(btn1txt);
		line1.appendChild(line1btn);
		line1p.appendChild(line1txt);
		line1.appendChild(line1p);
		line2btn.appendChild(btn2txt);
		line2.appendChild(line2btn);
		line2p.appendChild(line2txt);
		line2.appendChild(line2p);
		list.appendChild(line1);
		list.appendChild(line2);
		mTitle.appendChild(titleTxt);
		innerDiv.appendChild(mTitle);
		innerDiv.appendChild(list);
		h3.appendChild(h3Txt);
		content.appendChild(h3);
		content.appendChild(innerDiv);
		modal.appendChild(content);
		modal.appendChild(img);
		fragment.appendChild(modal)
		document.querySelector('body').appendChild(fragment);
		document.querySelector('body').appendChild(overlay);
				
		var showClass = 'clownzano-show',
				showImgClass = 'clownzano-md-open';
		
		function getClownLinks() {
			var headings = document.getElementsByClassName('fullheadline');
			for (var i = 0; i < headings.length; i++) {
				if (headings.item(i).children[0].href.indexOf('canzano') > -1) {
					headings.item(i).children[0].classList.add('clownzano');
				}
			}
		}

		function getMoreClownLinks() {
			if (event.animationName == "nodeInserted") {
				getClownLinks();
			}
		}
		
		function closeModal() {
			img.classList.remove(showImgClass);
			setTimeout(function() {
        modal.classList.remove(showClass)}, 
      300);
		}

		function openModal(ev) {
      ev.preventDefault(); 
			var thisUrl = ev.target.href;
      modal.classList.add(showClass);
      setTimeout(function() {
				img.classList.add(showImgClass)}, 
			150);

			document.querySelector('.clownzano-close').addEventListener('click', function() {
				closeModal();
			});
			
			document.querySelector('.clownzano-ok').addEventListener('click', function(e) {
				chrome.runtime.sendMessage({'message': 'set_tab_url', 'url': thisUrl})
			});
		}
		
		document.addEventListener("animationstart", function(e) {
			if (e.animationName == "nodeInserted") {
				getClownLinks();
			}
		});
				
		getClownLinks();

		document.querySelector('.wrapper').addEventListener('click', function(e){
			if(e.target.classList.contains('clownzano')) {
				openModal(e);
			}
		});
	}
	
	init();
})();