module.exports = {
  pathPrefix: "/C01-Write-Ups",
  siteMetadata: {
    title: `CSCC01 - Team Byte Me`,
    description: `CSCC01 Project Write Ups`,
    author: `Yifei Yin, Katrina Chen, Leo Zhou, Jeoy Zhuang, Min Qi Zhang`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `./src/images/icon.png`,
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // MDX Config
    // https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/?=mdx
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.tsx"),
        },
      },
    },
  ],
}
