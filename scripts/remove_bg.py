from PIL import Image
import os

def remove_white_background(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Keep Red pixels, make everything else transparent
            # Red is dominant in Red channel.
            # Heuristic: R > 100 and R > G + 30 and R > B + 30
            # Adjusting for the specific red in the logo (likely bright red)
            r, g, b = item[0], item[1], item[2]
            
            # Check if it's "red enough"
            if r > 120 and r > g + 20 and r > b + 20:
                # Keep original color (ensure alpha is 255 if it was 0 or partial)
                # But wait, if the original had alpha, we should respect it? 
                # No, the input is likely fully opaque (fake png).
                newData.append((r, g, b, 255))
            else:
                # Make transparent
                newData.append((255, 255, 255, 0))

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} and saved to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    input_file = "public/logo.png"
    # Overwrite the same file
    output_file = "public/logo.png"
    
    if os.path.exists(input_file):
        remove_white_background(input_file, output_file)
    else:
        print(f"File not found: {input_file}")
