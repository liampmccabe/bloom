import React, { useState, useEffect } from "react"

import { ImageEditor } from "src/canvas/components/imageEditor/ImageEditor"

import { useDebounce } from "src/canvas/utils/delay"
import { useFetch } from "src/canvas/utils/http"
import assetsStyles from "./assets.module.css"

interface IAssets {}

export function Assets({}: IAssets) {
	const [assets, setAssets] = useState<any>([])
	const [searchTerm, setSearchTerm] = useState("")
	const [response, fetchData] = useFetch()
	const debouncedSearchTerm = useDebounce(searchTerm, 500)
	const [results, setResults] = useState([])

	useEffect(() => {
		if (debouncedSearchTerm.length) {
			fetchData(
				`${process.env.REACT_APP_PIXABAY_API_URL}/?key=${
					process.env.REACT_APP_PIXABAY_API_KEY
				}&q=${`${debouncedSearchTerm} vector`}`
			)
		} else {
			setResults([])
		}
	}, [debouncedSearchTerm])

	useEffect(() => {
		if (response && response.hits) {
			setResults(response.hits)
		} else {
			setResults([])
		}
	}, [response])

	const handleChange = (e: any) => {
		setSearchTerm(e.target.value)
	}

	const addImageToLibrary = async (files: any) => {
		const images = []

		for (let file of files) {
			images.push(URL.createObjectURL(file))
		}

		setAssets(images)
	}

	return (
		<div className={assetsStyles.container}>
			<div className={assetsStyles.search}>
				<span>Assets</span>
				<form className={assetsStyles.searchForm}>
					<input type="text" placeholder="Search for an asset..." onChange={handleChange} />
				</form>
				{results.length > 0 && (
					<div className={assetsStyles.results}>
						{results.map((result: any, index: number) => (
							<div key={`result-${index}`} className={assetsStyles.asset}>
								<img src={result.previewURL} />
							</div>
						))}
					</div>
				)}
			</div>
			<div className={assetsStyles.upload}>
				<ImageEditor onDone={addImageToLibrary} />
			</div>
			{assets.length > 0 && (
				<div className={assetsStyles.assets}>
					{assets.map((asset: any, index: number) => (
						<div key={`asset-${index}`} className={assetsStyles.asset}>
							<img src={asset} />
						</div>
					))}
				</div>
			)}
		</div>
	)
}
