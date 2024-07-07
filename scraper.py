import requests
from bs4 import BeautifulSoup
import json
import os

def scrape_certlibrary(url):
    try:
        # Initialize an empty list to store question-answer pairs
        question_answer_data = []
        
        # Start scraping loop for pagination
        page = 1
        while True:
            # Construct URL for current page
            current_url = f'{url}?page={page}'
            
            # Send a GET request to the URL
            response = requests.get(current_url)
            response.raise_for_status()  # Raise an exception for bad status codes
            
            # Parse the HTML content
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all elements that contain questions and answers
            question_cards = soup.find_all('div', class_='card question_card')
            
            # If no question cards found, break the loop
            if not question_cards:
                break
            
            # Iterate over question cards
            for card in question_cards:
                # Extract question number
                question_number = card.find('h5', class_='mb-0').text.strip().split()[1]
                
                # Extract question text
                question_text_elem = card.find('div', class_='question_text')
                question_text = question_text_elem.find_all('p')[0].get_text(separator='\n').strip()
                
                # Check if there are images in the question
                question_image_elem = question_text_elem.find('img')
                question_image = question_image_elem['src'] if question_image_elem else None
                
                # Extract answer text
                answer_text_elem = card.find('div', class_='answer_block')
                answer_text = answer_text_elem.find('p').get_text(separator='\n').strip()
                
                # Check if there are images in the answer
                answer_image_elem = answer_text_elem.find('img')
                answer_image = answer_image_elem['src'] if answer_image_elem else None
                
                # Create a dictionary for each question-answer pair
                qa_pair = {
                    'question_number': question_number,
                    'question_text': question_text,
                    'question_image': question_image,
                    'answer_text': answer_text,
                    'answer_image': answer_image
                }
                
                # Append the dictionary to the list
                question_answer_data.append(qa_pair)
            
            # Increment page counter for next iteration
            page += 1
        
        # Convert data to JSON string
        json_data = json.dumps(question_answer_data, indent=2)
        
        # Save JSON data to a file
        filename = 'az900_questions_answers.json'
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(json_data)
        
        print(f'Scraping and JSON conversion completed successfully. Data saved to {filename}')
        
    except requests.exceptions.RequestException as e:
        print(f'Error fetching data: {e}')
    
    except Exception as e:
        print(f'Error: {e}')

# URL for the CertLibrary AZ-900 exam page
url = 'https://www.certlibrary.com/exam/AZ-900'

# Run the scraping function
scrape_certlibrary(url)
