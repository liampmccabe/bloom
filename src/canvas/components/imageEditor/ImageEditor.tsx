//@ts-nocheck
import React from "react"
import { create } from "src/vendor/react-doka/lib/doka.esm.min"
import "src/vendor/react-doka/lib/doka.min.css"

import imageEditorStyles from "./imageEditor.module.css"
import { FilePond, registerPlugin } from "react-filepond"

import "../../../../node_modules/filepond/dist/filepond.min.css"
import "../../../../node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import "../../../../node_modules/filepond-plugin-image-edit/dist/filepond-plugin-image-edit.min.css"

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginImageEdit from "filepond-plugin-image-edit"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageResize from "filepond-plugin-image-resize"
import FilePondPluginImageFilter from "filepond-plugin-image-filter"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImageCrop,
	FilePondPluginImageResize,
	FilePondPluginImageFilter,
	FilePondPluginImagePreview,
	FilePondPluginImageEdit,
	FilePondPluginImageTransform
)

export class ImageEditor extends React.Component<any, any> {
	constructor(props: any) {
		super(props)

		this.state = {
			files: []
		}
	}

	render() {
		return (
			<div className={imageEditorStyles.container}>
				<FilePond
					ref={ref => (this.pond = ref)}
					files={this.state.files}
					allowMultiple={true}
					styleItemPanelAspectRatio={0.5625}
					imageCropAspectRatio="1:1"
					imageFilterColorMatrix={[
						0.15,
						1.3,
						-0.25,
						0.1,
						-0.2,
						0.15,
						1.3,
						-0.25,
						0.1,
						-0.2,
						0.15,
						1.3,
						-0.25,
						0.1,
						-0.2,
						0.0,
						0.0,
						0.0,
						1.0,
						0.0
					]}
					imageEditEditor={create({
						cropAspectRatioOptions: [
							{
								label: "Free",
								value: null
							},
							{
								label: "Portrait",
								value: 1.25
							},
							{
								label: "Square",
								value: 1
							},
							{
								label: "Landscape",
								value: 0.75
							}
						]
					})}
					onupdatefiles={fileItems => {
						this.setState({
							files: fileItems.map(fileItem => fileItem.file)
						})
					}}
				/>
				{this.state.files.length > 0 && (
					<button onClick={() => this.props.onDone(this.state.files)}>Add images to library</button>
				)}
			</div>
		)
	}
}
