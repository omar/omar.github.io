jekyll-serve:
	docker run -v $(pwd):/site -p 4000:4000 bretfisher/jekyll serve