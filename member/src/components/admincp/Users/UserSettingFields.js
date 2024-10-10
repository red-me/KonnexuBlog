const settings = [

    {
        key: "profile_displayName",
        id: 1,
        title: "Display Name",
        description: "Show this name instead of your Firstname and Lastname.",
        type: "String", defaultValue: '',
        prefer: {
            className: 'w-full shadow-inner '
        }
    },
    {
        key: "profile_firstName",
        id: 2,
        title: "Firstname",
        description: "",
        type: "String", defaultValue: '',
        prefer: {
            className: 'w-1/2'
        }
    },
    {
        key: "profile_lastName",
        id: 3,
        title: "Lastname",
        description: "",
        type: "String", defaultValue: '',
        prefer: {
            className: 'w-1/2'
        }
    },

    {
        key: "name",
        id: 4,
        title: "Username",
        description: "",
        type: "String", defaultValue: ''
    },
    {
        key: "password",
        id: 5,
        title: "Password",
        description: "Leave these fields empty if you do not want to change the password for this user.",
        type: "Password", defaultValue: null
    },
    {
        key: "email",
        id: 6,
        title: "Email",
        description: "",
        type: "Email", defaultValue: false,
        prefer: {
            className: 'w-96 '
        }
    },
    {
        key: "userGroupId",
        id: 7,
        title: "User Group",
        description: "Setting this field to 'Administrator' will allow the user to access the Admin Control Panel.",
        type: "UserGroup", defaultValue: null,
        prefer: {
            className: 'w-96 shadow rounded-sm'
        }
    },
    {
        key: "profile_location",
        id: 8,
        title: "Location",
        description: "",
        type: "Country", defaultValue: '',
        prefer: {
            className: 'w-96'
        }
    },
    {
        key: "profile_city",
        id: 9,
        title: "City",
        description: "",
        type: "String", defaultValue: ''
    },
    {
        key: "profile_zip",
        id: 10,
        title: "ZIP / Postal Code",
        description: "",
        type: "String", defaultValue: ''
    },
    {
        key: "profile_gender",
        id: 11,
        title: "Gender",
        description: "",
        type: "Gender", defaultValue: ''
    },
    {
        key: "profile_dob",
        id: 12,
        title: "Date of Birth",
        description: "",
        type: "Date", defaultValue: ''
    },
    {
        key: "profile_tz",
        id: 13,
        title: "Timezone",
        description: "",
        type: "Timezone", defaultValue: ''
    },
    {
        key: "profile_spamCount",
        id: 14,
        title: "Can upload photos?",
        description: "",
        type: "Int", defaultValue: 0
    },
    {
        key: "profile_primaryLanguage",
        id: 15,
        title: "PrimaryLanguage",
        description: "",
        type: "Language", defaultValue: ''
    },
    {
        key: "profile_avatar",
        id: 16,
        title: "",
        description: "Note: Photo is not final until settings are saved.",
        type: "Picture", defaultValue: ''
    },



    {
        key: "privacySettings_whoCanViewProfilePage",
        id: 17,
        title: "Who can view your profile page?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanViewProfilePageInfoTab",
        id: 18,
        title: "Who can view the info tab on your profile page?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanViewBasicInfo",
        id: 19,
        title: "Who can view your basic info?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanViewLocation",
        id: 20,
        title: "Who can view your location?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanViewProfilePageActivities",
        id: 21,
        title: "Who can view your activities section on your profile page?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanPostOnWall",
        id: 22,
        title: "Who can share a post on your wall?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanViewFriendsList",
        id: 23,
        title: "Who can view your friends' list?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanSendFriendRequest",
        id: 24,
        title: "Who can send me a friend request?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanSendMessage",
        id: 25,
        title: "Send you a message",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanViewProfilePagePhotos",
        id: 26,
        title: "Who can view photos on your profile page?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanSendPokes",
        id: 27,
        title: "Can send pokes",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanDisplayRSSSubscriberCount",
        id: 28,
        title: "Display RSS subscribers count",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanSubscribeToRSS",
        id: 29,
        title: "Subscribe to your RSS feed",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanViewProfilePageRecentlyViewedBy",
        id: 30,
        title: "Who can view who recently viewed your profile?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },
    {
        key: "privacySettings_whoCanTagMe",
        id: 31,
        title: "Who can tag me in written contexts?",
        description: "",
        type: "PrivacySettings", defaultValue: 'A'
    },




]

export default settings;