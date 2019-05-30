gpg -o lsb_RGB.png.enc --symmetric lsb_RGB.png
vim motDePasseGPG.txt
openssl genrsa -out priv.key 4096
openssl rsa -pubout -out public.key -in priv.key
openssl rsa -noout -text -in priv.key | grep prime1 -A 18 > prime.txt
sed -i 's/7f/fb/g' prime.txt
sed -i 's/e1/66/g' prime.txt
sed -i 's/f4/12/g' prime.txt
sed -i 's/16/54/g' prime.txt
sed -i 's/a4/57/g' prime.txt
sed -i 's/b5/cd/g' prime.txt
openssl rsautl -encrypt -pubin -inkey public.key -in motDePasseGPG.txt -out motDePasseGPG.txt.enc
