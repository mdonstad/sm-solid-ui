    
module.exports = {

    onPreBuild:async ({ constants }) => {
        const store = getDeployStore({
          siteID: constants.SITE_ID,
          token: constants.NETLIFY_API_TOKEN,
        });
        await store.set("appCS", "For App Config",{
            metadata: {
                name: 'Smart Mixers',
                themeDark: 'hsl(199.7 85.9% 47.7%)',
                themeLight: 'hsl(198.6 88.7% 48.4%)',
                color: 'hsl(199.7 85.9% 45.7%)',
               
            }
        });
    }
}