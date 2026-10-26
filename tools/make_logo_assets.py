"""Build all logo derivatives from the square logo (gold coin on white).
Usage: python3 tools/make_logo_assets.py path/to/logo.jpg [path/to/banner.jpg]
Without arguments it draws a plain gold "G" coin placeholder."""
import sys,os
from PIL import Image,ImageDraw,ImageFont,ImageFilter
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));A=os.path.join(ROOT,'assets')
S=1024
def placeholder():
    im=Image.new('RGBA',(S,S),(0,0,0,0));d=ImageDraw.Draw(im)
    d.ellipse((8,8,S-8,S-8),fill=(150,118,22));d.ellipse((34,34,S-34,S-34),fill=(196,160,40))
    for r in range(0,420,6):
        a=int(40*(1-r/420));d.ellipse((S/2-r-60,S/2-r-80,S/2+r-60,S/2+r-80),outline=(255,236,150,a),width=6)
    f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',620)
    d.text((S/2,S/2+20),'G',font=f,anchor='mm',fill=(255,255,255,235),stroke_width=10,stroke_fill=(120,90,20))
    return im
def cut(path):
    src=Image.open(path).convert('RGB');w,h=src.size;s=min(w,h)
    src=src.crop(((w-s)//2,(h-s)//2,(w-s)//2+s,(h-s)//2+s)).resize((S,S),Image.LANCZOS)
    # find circle: non-white bounding box
    g=src.convert('L').point(lambda v:255 if v<235 else 0);bb=g.getbbox() or (0,0,S,S)
    m=Image.new('L',(S*4,S*4),0);ImageDraw.Draw(m).ellipse(tuple(int(v*4)+(6 if i<2 else -6) for i,v in enumerate(bb)),fill=255)
    m=m.resize((S,S),Image.LANCZOS);src.putalpha(m);return src.crop(bb).resize((S,S),Image.LANCZOS)
logo=cut(sys.argv[1]) if len(sys.argv)>1 else placeholder()
logo.save(os.path.join(A,'logo-1024.png'))
for n,sz in [('logo-round.webp',512),('logo-256.webp',256)]: logo.resize((sz,sz),Image.LANCZOS).save(os.path.join(A,n),'WEBP',quality=88)
logo.resize((512,512),Image.LANCZOS).save(os.path.join(A,'logo-round.png'),optimize=True)
os.remove(os.path.join(A,'logo-1024.png'))
for n,sz in [('favicon-32.png',32),('favicon-16.png',16),('apple-touch-icon.png',180),('icon-192.png',192),('icon-512.png',512)]:
    bg=Image.new('RGBA',(sz,sz),(26,18,11,255) if n in('apple-touch-icon.png',) else (0,0,0,0));bg.alpha_composite(logo.resize((sz,sz),Image.LANCZOS));bg.save(os.path.join(A,n))
logo.resize((64,64),Image.LANCZOS).save(os.path.join(ROOT,'favicon.ico'),sizes=[(16,16),(32,32),(48,48),(64,64)])
# og image 1200x630
og=Image.new('RGB',(1200,630),(22,15,9));d=ImageDraw.Draw(og)
for x in range(-630,1200,46): d.line((x,630,x+630,0),fill=(34,24,14),width=18)
glow=Image.new('L',(1200,630),0);ImageDraw.Draw(glow).ellipse((830-330,315-330,830+330,315+330),fill=120);glow=glow.filter(ImageFilter.GaussianBlur(90))
og.paste(Image.new('RGB',(1200,630),(230,180,60)),(0,0),glow)
og.paste(logo.resize((460,460),Image.LANCZOS),(600,85),logo.resize((460,460),Image.LANCZOS))
def F(p,s):
    try:return ImageFont.truetype(p,s)
    except Exception:return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',s)
d.text((70,170),'GINNAN',font=F('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',112),fill=(244,205,98))
d.text((74,310),'$GINNAN on Ethereum',font=F('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',44),fill=(245,236,215))
d.text((74,380),'The golden tabby coin.',font=F('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',34),fill=(200,180,140))
og.save(os.path.join(A,'og-image.jpg'),quality=86)
print('logo assets written', 'from '+sys.argv[1] if len(sys.argv)>1 else '(PLACEHOLDER)')
