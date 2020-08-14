import { IGroup } from "src/canvas/canvas"

export const ExampleTemplate: IGroup = {
	pages: [
		{
			title: "First page",
			background: "/templates/example/img/cover.png",
			elements: [
				{
					type: "heading",
					name: "title",
					left: 40,
					top: 100,
					width: 400,
					text: "Snoop",
					locked: true
				}
			]
		},
		{
			title: "Second page",
			background: "/templates/example/img/art.png",
			elements: [
				{
					type: "image",
					name: "title",
					left: 20,
					top: 120,
					width: 220,
					height: 220,
					locked: true
				},
				{
					type: "image",
					name: "title",
					left: 300,
					top: 120,
					width: 220,
					height: 220,
					locked: true
				},
				{
					type: "image",
					name: "title",
					left: 540,
					top: 120,
					width: 220,
					height: 220,
					locked: true
				}
			]
		},
		{
			title: "Third page",
			background: "/templates/example/img/history.png",
			elements: [
				{
					type: "paragraph",
					name: "title",
					left: 40,
					top: 100,
					width: 400,
					text:
						"Not just a well crafted logo but how something makes you feel. How it reacts, behaves and breaths to an ever-changing environment. Great brands don’t only thrive because of their roots, but their drive to evolve. Core values should not only distinguish a company, but also give it room to grow. Only then will it become timeless.",
					locked: true
				}
			]
		},
		{
			title: "Fourth page",
			background: "/templates/example/img/tree.png",
			elements: [
				{
					type: "paragraph",
					name: "title",
					left: 40,
					top: 100,
					width: 400,
					text:
						"Not just a well crafted logo but how something makes you feel. How it reacts, behaves and breaths to an ever-changing environment. Great brands don’t only thrive because of their roots, but their drive to evolve. Core values should not only distinguish a company, but also give it room to grow. Only then will it become timeless.",
					locked: true
				}
			]
		},
		{
			title: "Fifth page",
			elements: []
		},
		{
			title: "Sixth page",
			elements: []
		},
		{
			title: "Fourth page",
			background: "/templates/example/img/report.png",
			elements: [
				{
					type: "paragraph",
					name: "title",
					left: 40,
					top: 100,
					width: 400,
					text:
						"Not just a well crafted logo but how something makes you feel. How it reacts, behaves and breaths to an ever-changing environment. Great brands don’t only thrive because of their roots, but their drive to evolve. Core values should not only distinguish a company, but also give it room to grow. Only then will it become timeless.",
					locked: true
				}
			]
		},
		{
			title: "Fourth page",
			background: "/templates/example/img/quiz.png",
			elements: [
				{
					type: "paragraph",
					name: "title",
					left: 40,
					top: 100,
					width: 400,
					text:
						"Not just a well crafted logo but how something makes you feel. How it reacts, behaves and breaths to an ever-changing environment. Great brands don’t only thrive because of their roots, but their drive to evolve. Core values should not only distinguish a company, but also give it room to grow. Only then will it become timeless.",
					locked: true
				}
			]
		}
	]
}
