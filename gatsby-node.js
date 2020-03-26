const path = require("path");
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.createResolvers = (
  {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  },
) => {
  const { createNode } = actions
  createResolvers({
    Wordpress_MediaItem: {
      gatsbyImageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.mediaItemUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
  {
    wordpress {
      posts{
        nodes {
          slug
          id
        }
      }
    }
  }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create post pages.
    const posts = result.data.wordpress.posts.nodes;
    posts.forEach(post => {
      createPage({
        path: `/${post.slug}`,
        component: path.resolve(__dirname+'/src/templates/post.js'),
        context: {
          id: post.id,
          slug: post.slug,
        }
      });

    });

  });
};

