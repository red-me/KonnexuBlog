const settings = {
    upload_photos: {
        title: "Can upload photos?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    max_num_photos: {
        title: "Maximum number of photos",
        description: "Define the total number of photos a user within this user group can upload. Notice: Setting this value to 0 will allow them to upload an unlimited amount of photos.",
        type:"Int", defaultValue: "0"
    },
    max_photo_per_upload: {
        title: "Maximum number of images per upload",
        description: "Define the maximum number of images a user can upload each time they use the upload form. \nNotice: This setting does not control how many images a user can upload in total, just how many they can upload each time they use the upload form to upload new images.",
        type:"Int", defaultValue: 0
    },

    activity_points: {
        title: "Activity points",
        description: "How many activity points should a user receive for uploading a new image.",
        type:"Int", defaultValue: 0
    },
    create_new_photo_album: {
        title: "Can create a new photo album?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    use_privacy_settings_on_album_creation: {
        title: "Can use privacy settings when creating an album?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    max_photo_albums: {
        title: "Maximum number of photo albums",
        description: "Define the total number of photo albums a user within this user group can create. Notice: Setting this value to 0 will allow them to create an unlimited amount of photo albums. ",
        type:"Int", defaultValue: 0
    },
    view_photos: {
        title: "Can browse and view the photo module?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    search_photo_and_albums: {
        title: "Can search for photos and photo albums?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    download_other_photos: {
        title: "Can download other users photos?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    comment_on_photos: {
        title: "Can post comments on photos?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    comment_on_albums: {
        title: "Can post comments on photo albums?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    add_mature_photos_with_warning: {
        title: "Can add mature images with warnings?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    photo_mature_age_minimum: {
        title: "Photo mature age limit?",
        description: "Note: The age you define will - not allow users with younger the ability to view mature photos (strict) - display warning to users with younger while viewing mature photos (warning)",
        type:"Int", defaultValue: 0
    },
    page_sizes: {
        title: "Define how many images a user can view at once when browsing the public photo section?",
        description: "",
        type:"ListOfInt", defaultValue: [20, 40, 60]
    },
    edit_own_photo: {
        title: "Can edit own photo?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    edit_any_photo: {
        title: "Can edit all photos?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    delete_own_photo: {
        title: "Can delete own photos?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    delete_any_photo: {
        title: "Can delete all photos?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    edit_own_photo_album: {
        title: "Can edit own photo albums?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    edit_any_photo_album: {
        title: "Can edit all photo albums?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    delete_own_photo_album: {
        title: "Can delete own photo albums?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    delete_any_photo_album: {
        title: "Can delete all photo albums?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    require_approval_to_publish: {
        title: "Photos must be approved first before they are displayed publicly?",
        description: "Set this to True if photos uploaded must be approved before they are visible to the public.",
        type:"Boolean", defaultValue: false
    },
    approve_photo_with_approval_requirement: {
        title: "Can approve photos that require moderation?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    feature_photo: {
        title: "Can feature a photo?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    tag_own_photo: {
        title: "Can tag own photo?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    tag_any_photo: {
        title: "Can tag photos added by all users?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    tag_own_photo_max_count: {
        title: "How many times can a user tag their own photo?. Set 0 won't allow users to tag on their own photos",
        description: "",
        type:"Int", defaultValue: 0
    },
    tag_any_photo_max_count: {
        title: "How many times can this user tag photos added by other users?. Set 0 won't allow users to tag on photos added by other users",
        description: "",
        type:"Int", defaultValue: 0
    },
    max_upload_file_size: {
        title: "Max file size for photos upload",
        description: "Max file size for photos upload in kilobytes (kb). (1024 kb = 1 mb) For unlimited add \"0\" without quotes.",
        type:"Int", defaultValue: 0
    },
    sponsor_photo_for_free: {
        title: "Can members of this user group mark a photo as Sponsor without paying fee?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    paid_sponsor_ad_space_for_photo: {
        title: "Can members of this user group purchase a sponsored ad space for photos?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    auto_publish_sponsored_item: {
        title: "Auto publish sponsored item?",
        description: "After the user has purchased a sponsored space, should the item be published right away? If set to No, the admin will have to approve each new purchased sponsored item space before it is shown in the site.",
        type:"Boolean", defaultValue: false
    },
    sponsor_photo_price: {
        title: "How much is the sponsor space worth for photos? This works in a CPM basis.",
        description: "",
        type:"FixedListOfKeyedInt", defaultValue: { "$": 0, "€": 0, "£": 0 }
    },
    view_albums: {
        title: "Can view photo albums?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    upload_timeout_mins: {
        title: "Flood control photos",
        description: "How many minutes should a user wait before they can upload another batch of photos? Note: Setting it to \"0\" (without quotes) is default and users will not have to wait.",
        type:"Int", defaultValue: 0
    },
    feature_photo_refresh_time_out: {
        title: "How many minutes or seconds the script should wait until it refreshes the feature photo?",
        description: `Define how many minutes or seconds the script should wait until it refreshes the feature photo.\n
        Notice: To add X minutes here are some examples:\n
        1 min\n
        2 min\n
        30 min\n
        If you would like to define it in seconds here are some examples:\n
        20 sec\n
        30 sec\n
        90 sec`,
        type:"Int", defaultValue: 0
    },
    max_image_width: {
        title: "Maximum image width keeps in server (in pixel)",
        description: "If image width user upload higher than this value will crop to this value.",
        type:"Int", defaultValue: 1200
    },

    sponsor_photo_album_for_free: {
        title: "Can members of this user group purchase a sponsored ad space for photo albums?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    paid_sponsor_ad_space_for_photo_album: {
        title: "Can members of this user group purchase a sponsored ad space for photos?",
        description: "",
        type:"Boolean", defaultValue: false
    },

    feature_photo_album: {
        title: "Can feature a photo album?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    auto_publish_sponsored_album: {
        title: "Can automatically publish a sponsored photo album?",
        description: "",
        type:"Boolean", defaultValue: false
    },
    sponsor_photo_album_price: {
        title: "How much is the sponsor space worth for photo albums? This works in a CPM basis.",
        description: "",
        type:"FixedListOfKeyedInt", defaultValue: { "$": 0, "€": 0, "£": 0 }
    }

}

export default settings