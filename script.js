
        const chat = document.getElementById('chat');
        const input = document.getElementById('input');
        const sendBtn = document.getElementById('send');
        
        let userName = ""; // Untuk menyimpan nama user
        
        function addMessage(text, isUser) {
            const msg = document.createElement('div');
            msg.className = `message ${isUser ? 'user' : 'bot'}`;
            msg.textContent = text;
            chat.appendChild(msg);
            chat.scrollTop = chat.scrollHeight;
        }
        
        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'message typing';
            typing.id = 'typing';
            
            for(let i = 0; i < 3; i++) {
                const dot = document.createElement('span');
                dot.className = 'dot';
                typing.appendChild(dot);
            }
            
            chat.appendChild(typing);
            chat.scrollTop = chat.scrollHeight;
        }
        
        function hideTyping() {
            const typing = document.getElementById('typing');
            if(typing) typing.remove();
        }
        
        function botReply(userText) {
            // Jika belum ada nama user
            if(!userName) {
                userName = userText.trim();
                return `Halo ${userName}! Senang bertemu dengan mu 😊`;
            }
            
            // Respon umum setelah nama diketahui
            const responses = [
                `Ada yang bisa Nabil bantu, ${userName}?`,
                `Wah ${userName}, kamu keren banget!`,
                `${userName}, Nabil suka ngobrol sama kamu!`,
                `Hari ini cerah ya, ${userName}?`,
                `Nabil di sini siap membantu kamu, ${userName}!`,
                `Wah pertanyaan menarik nih dari ${userName}`
            ];
            
            // Respons khusus
            if(userText.toLowerCase().includes('halo')) return `Halo juga ${userName}!`;
            if(userText.toLowerCase().includes('apa kabar')) return `Nabil baik-baik aja, kamu gimana ${userName}?`;
            if(userText.toLowerCase().includes('terima kasih')) return `Sama-sama ${userName}!`;
            if(userText.toLowerCase().includes('nama kamu')) return `Nama aku Nabil, teman chat kamu!`;
            
            // Random response
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        function handleSend() {
            const text = input.value.trim();
            if(text === '') return;
            
            addMessage(text, true);
            input.value = '';
            
            showTyping();
            
            setTimeout(() => {
                hideTyping();
                const reply = botReply(text);
                addMessage(reply, false);
                
                // Ganti placeholder setelah nama diketahui
                if(!input.placeholder.includes('pesan')) {
                    input.placeholder = "Ketik pesan...";
                }
            }, 1000 + Math.random() * 1500);
        }
        
        sendBtn.addEventListener('click', handleSend);
        
        input.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                handleSend();
            }
        });
    