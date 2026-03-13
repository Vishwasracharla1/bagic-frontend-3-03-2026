async function testApi(question) {
    try {
        const response = await fetch('https://ig.gov-cloud.ai/chatbot-ai-coach/chat', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "question": question
            })
        });
        const data = await response.json();
        console.log(`Question: ${question}`);
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

testApi("tell me about BAJ00001");
