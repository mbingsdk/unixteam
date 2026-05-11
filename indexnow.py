import requests

url = "https://api.indexnow.org/IndexNow"

payload = {
    "host": "unixteam.my.id",
    "key": "cb460db149c040238676e736dee025fc",
    "keyLocation": "https://unixteam.my.id/cb460db149c040238676e736dee025fc.txt",
    "urlList": [
        "https://unixteam.my.id",
        "https://unixteam.my.id/about",
        "https://unixteam.my.id/team",
        "https://unixteam.my.id/projects",
        "https://unixteam.my.id/blog",
        "https://unixteam.my.id/faq",
        "https://unixteam.my.id/documentation",
        "https://unixteam.my.id/discord",
        "https://unixteam.my.id/contact",

        "https://unixteam.my.id/blog/panduan-bertahan-di-unix",
        "https://unixteam.my.id/blog/cara-jadi-afk-legend",
        "https://unixteam.my.id/blog/kamus-bahasa-unix",
        "https://unixteam.my.id/blog/sejarah-rivalri-katspoll",
        "https://unixteam.my.id/blog/mabar-pembubaran-unix",

        "https://unixteam.my.id/documentation/cara-join",
        "https://unixteam.my.id/documentation/hierarki-unix",
        "https://unixteam.my.id/documentation/budaya-unix",

        "https://unixteam.my.id/projects/sumbing-weather-companion",
        "https://unixteam.my.id/projects/sumbing-companion-apk",
        "https://unixteam.my.id/projects/roblox-npc-automation",
        "https://unixteam.my.id/projects/admin-client-hub",
        "https://unixteam.my.id/projects/script-generator",
        "https://unixteam.my.id/projects/debug-console"
    ]
}

response = requests.post(
    url,
    json=payload,
    headers={
        "Content-Type": "application/json; charset=utf-8"
    }
)

print("Status Code:", response.status_code)
print("Response:", response.text)