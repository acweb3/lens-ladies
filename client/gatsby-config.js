const config = require("./config");

module.exports = {
	siteMetadata: {
		siteUrl: "https://www.ladies-of-the-lens.com",
		title: "Ladies of the Lens",
	},
	plugins: [
		"gatsby-plugin-root-import",
		"gatsby-plugin-provide-react",
		"gatsby-plugin-styled-components",
		"gatsby-plugin-image",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sitemap",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/assets/images",
			},
			__key: "images",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "videos",
				path: "./src/assets/videos",
			},
			__key: "videos",
		},
		{
			resolve: "gatsby-plugin-react-svg",
			options: {
				rule: {
					include: /icons/,
				},
			},
		},

		// S3 Deploy
		{
			resolve: "gatsby-plugin-s3",
			options: {
				bucketName: config.aws.s3BucketName,
				protocol: "https",
				hostname: config.aws.url,
			},
		},
	],
};
