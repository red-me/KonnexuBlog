
const { prisma } = require("../services/prisma/db")

const { DEFAULT_THEME, SAMPLE_THEME } = require("./data")

const { encrypt, compare } = require('../utils/crypt')

const requireDefaultUserGroups = async () => {

    try {

        // console.log('🔹 Checking Default User Groups...')
        const createMany = await prisma.userGroup.createMany({
            data: [
                { name: 'Administrator' },
                { name: 'Registered User' },
                { name: 'Guest' },
                { name: 'Staff' },
            ],
            skipDuplicates: true, // Skip 
        })

        console.log(`✅ Checking Default User Groups. ${createMany.count} record(s) was added.`)
    } catch (error) {
        console.error(error)
    }
}


const createUser = (email, name, password, firstName, lastName, displayName, avatar, userGroupName) => {

    return prisma.user.create({
        data:
        {
            email,
            name,
            password: password,
            active: true,
            profile: {
                create: {
                    firstName,
                    lastName,
                    displayName,
                    avatar
                }
            },
            userGroup: { connect: { name: userGroupName } },
        },

    })

}
const requireDefaultUsers = async () => {

    try {

        let users = []

        const password = "123456"
        // console.log('🔹 Checking Default Users ...')
        const encryptedPassword = await encrypt(password)
        if (await prisma.user.count({ where: { email: "lauren.bloom@newamsterdam.com" } }) == 0) {
            const user1 = await createUser("lauren.bloom@newamsterdam.com", "lauren", encryptedPassword, "Lauren", "Bloom", "Administrator", "", "Registered User")
            if (user1.id) users.push(user1)
        }
        if (await prisma.user.count({ where: { email: "helen.sharpe@newamsterdam.com" } }) == 0) {
            const user2 = await createUser("helen.sharpe@newamsterdam.com", "sharpei", encryptedPassword, "Helen", "Sharpe", "Dr. Sharpe, MD", "", "Administrator")
            if (user2.id) users.push(user2)
        }
        if (await prisma.user.count({ where: { email: "max.goodwin@newamsterdam.com" } }) == 0) {
            const user3 = await createUser("max.goodwin@newamsterdam.com", "maxmd", encryptedPassword, "Maximus", "Goodwin", "Max It is", "", "Registered User")
            if (user3.id) users.push(user3)
        }


        console.log(`✅ Checking Default Users. ${users.length} user record(s) was added.`)
    } catch (error) {
        console.error(error)
    }
}

const requireDefaultApps = async () => {

    try {

        const URL = (process.env.DEV == "TRUE" ? `http://localhost:9002` : "http://api.bellodynamics.net/files/apps/photos").trim()

        const createMany = await prisma.app.createMany({
            data: [
                {
                    name: "photos",
                    url: `${URL}`,
                    scope: "PHOTO",
                    modules: ["Main", "SharePhoto", "Settings"],
                    settings: { "categories": [{ "id": "nehnzvdkii5y0uotuytl376c", "name": "Family", "active": true }, { "id": "jbvhqgg9l75ap5uafyeco1jd", "name": "Technology", "active": true }, { "id": "gwjwep419a2ici4gfzqo1e0m", "name": "Travel", "active": true }, { "id": "tku0xc9ifvwkygy3udeg6elp", "name": "Nature", "active": true }, { "id": "lggbwmy7gubmipxnbgecewyk", "name": "Medicine", "active": true }, { "id": "o11hrhmok7xyum9urr0zr9hy", "name": "Leisure", "active": true }, { "id": "b83s9sbiwhs760c0kboec1w6", "name": "Art", "active": true }, { "id": "axv7kb9qxj9p9adpzlyret8d", "name": "Business", "active": false }, { "id": "e94j0hikhgehih33gmdj3ikj", "name": "Animals", "active": true }, { "id": "mwckngcg0xuy6m08k58px32w", "name": "Food & Beverage", "active": true }], "displaySettings": { "paginationType": "page-number", "editPhotoAfterUpload": null, "allowCategorySelection": true, "autoRefreshFeaturedPhotos": true }, "userGroupSettings": { "Administrator": { "page_sizes": [20, 40, 60], "view_albums": false, "view_photos": false, "feature_photo": false, "tag_any_photo": false, "tag_own_photo": false, "upload_photos": true, "edit_any_photo": false, "edit_own_photo": false, "max_num_photos": "0", "activity_points": 0, "max_image_width": 1200, "delete_any_photo": false, "delete_own_photo": false, "max_photo_albums": 0, "comment_on_albums": false, "comment_on_photos": false, "feature_photo_album": false, "sponsor_photo_price": { "$": 0, "£": 0, "€": 0 }, "upload_timeout_mins": 0, "edit_any_photo_album": false, "edit_own_photo_album": false, "max_photo_per_upload": 0, "max_upload_file_size": 0, "download_other_photos": false, "create_new_photo_album": false, "delete_any_photo_album": false, "delete_own_photo_album": false, "sponsor_photo_for_free": false, "search_photo_and_albums": false, "tag_any_photo_max_count": 0, "tag_own_photo_max_count": 0, "photo_mature_age_minimum": 0, "sponsor_photo_album_price": { "$": 0, "£": 0, "€": 0 }, "auto_publish_sponsored_item": false, "require_approval_to_publish": false, "auto_publish_sponsored_album": false, "sponsor_photo_album_for_free": false, "add_mature_photos_with_warning": false, "feature_photo_refresh_time_out": 0, "paid_sponsor_ad_space_for_photo": false, "paid_sponsor_ad_space_for_photo_album": false, "use_privacy_settings_on_album_creation": false, "approve_photo_with_approval_requirement": false } } },
                    enabled: true
                },
            ],
            skipDuplicates: true, // Skip 
        })

        console.log(`✅ Checking Default Apps. ${createMany.count} record(s) was added.`)
    } catch (error) {
        console.error(error)
    }
}

const requireDefaultTheme = async () => {

    try {

        const createMany = await prisma.theme.createMany({
            data: [
                {
                    name: 'Default',
                    description: 'This is the default theme',
                    featured: false,
                    data: DEFAULT_THEME

                },
                {
                    name: 'Green Pastures',
                    description: 'This is a sample custom theme.',
                    featured: false,
                    data: SAMPLE_THEME

                }
            ],
            skipDuplicates: true, // Skip 
        })

        console.log(`✅ Checking Default Theme. ${createMany.count} record(s) was added.`)
    } catch (error) {
        console.error(error)

    }
}

const requireDefaultSiteSetting = async () => {

    try {


        if (await prisma.siteSetting.count({}) == 0) {

            const defaultTheme = await prisma.theme.findUnique({ where: { name: 'Green Pastures' } })

            const createMany = await prisma.siteSetting.createMany({
                data: [
                    {
                        themeId: defaultTheme.id
                    }
                ],
                skipDuplicates: true, // Skip 
            })

            console.log(`✅ Checking Default SiteSetting. ${createMany.count} record(s) was added.`)
        }
        else {
            console.log(`✅ Checking Default SiteSetting. SiteSetting exists.`)
        }
    } catch (error) {
        console.error(error)

    }
}

const requireDefaultMenus = async () => {

    try {



        const createMany = await prisma.menu.createMany({
            data: [
                {
                    name: "main",
                    description: "this is the main navigation menu",
                    data: [
                        {
                            name: 'Home', url: "/", active: true, position: 1, icon: ''
                        },
                    ]
                },
                {
                    name: "footer",
                    description: "this is the footer navigation menu",
                    data: [
                        {
                            name: 'About Us', url: "/about-us", active: true, position: 1, icon: ''
                        },
                        {
                            name: 'License', url: "/license", active: true, position: 2, icon: ''
                        },
                        {
                            name: 'Contribute', url: "/contribute", active: true, position: 3, icon: ''
                        },
                        {
                            name: 'Contact Us', url: "/contact-us", active: true, position: 4, icon: ''
                        },
            ]
        }
            ],
skipDuplicates: true, // Skip 
        })

console.log(`✅ Checking Default Menus. ${createMany.count} record(s) was added.`)

    } catch (error) {
    console.error(error)

}
}

module.exports = async function () {

    console.log('Starting bootstrap tasks...')
    await requireDefaultUserGroups()
    await requireDefaultUsers()
    await requireDefaultApps()
    await requireDefaultTheme()
    await requireDefaultSiteSetting()
    await requireDefaultMenus();
}