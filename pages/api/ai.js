import ideas from "../../public/ideas/expert-ideas.json"

const input_json = JSON.stringify(ideas)
const system_prompt =  `You are human tasked with coming up with privacy focused project ideas for hackathons. Here is a list of example: ${input_json} Do not return any of these example right away, but you are alowed to combine them into new ideas. If you use any of the example as inspiration, add the list in output as 'basedOn'. Only print the result in the same format as the example inputs`
const url = "https://chatapi.akash.network/api/v1/chat/completions"
const chatApiKey = process.env.CHAT_API_KEY
console.log(chatApiKey)

export default async function handler(req, res) {
    const body = req.body

    if (body == undefined) {
        res.status(400)
        return
    }

    if (body.keywords == undefined) {
        res.status(400).json({error: "missing keywords"})
        return
    }

    const main_prompt = `Provide an idea based on keywords: ${body.keywords}; (ignore: ${new Date()})`

    const data = {                                                                                                                                                                                                                                                                                                    
        model: "Meta-Llama-3-1-8B-Instruct-FP8",
        messages: [ 
            {
                role: "system",
                content: system_prompt
            },
            {
                role: "user",
                content: main_prompt
            }
          ]
      }

    const response = await fetch(
        url, 
        {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${chatApiKey}`,
            },
        })
    
    if (response.status != 200) {
        res.status(500).json({error: "request to backend failed"})
        return
    }
    const respBody = await response.json()
    if (!respBody.choices || !respBody.choices[0] || !respBody.choices[0].message || !respBody.choices[0].message.content) {
        res.status(500).json({error: "failed to parse response from backend"})
        return
    }

    res.status(200).json(JSON.parse(respBody.choices[0].message.content));
  }
  