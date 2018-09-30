
from socket import*  #libreria
import pymysql
import sched
import time
import datetime
import random

s = sched.scheduler(time.time, time.sleep)

def do_something(sc):
        num1 = random.randrange(9)
        num2 = random.randrange(9)
        num3 = random.randrange(9)
        num4 = random.randrange(9)
        print ("Doing stuff...")
        data="b,>REV481599462982+2578"+str(num1)+str(num2)+"1-0802"+str(num3)+str(num4)+"5201228512<"
        print(data[3:6])
        if data[3:6]=="REV":
            semanas=str(data[8:12])
            semana=float(semanas)
            dia=str(data[12])
            dian=float(dia)
            hora=str(data[13:18])
            horan=float(hora)
            semanan=semana*604800+horan+315964800+dian*86400+18000
            string=str(datetime.datetime.fromtimestamp(int(semanan)))
            fecha=string[2  :12]
            hora=string[13:21]
            sem=str(datetime.datetime.fromtimestamp(int(semanan)))
            print(sem)
            latitud=str(data[19:21]+"."+str(data[21:26]))
            longitud=str(data[26:27]+str(data[28:30])+"."+str(data[30:35]))
            print("Latitud: {}  Longitud: {}   Fecha: {} ".format(latitud,longitud,sem))
            # BD Connection
            connection= pymysql.connect(host="localhost",user="hemel",passwd="parody2324",db="practice")
            MyCursor=connection.cursor()
            sql="INSERT INTO coordenadas(Latitud,Longitud,Fecha) VALUES(%s,%s,%s);"
            MyCursor.execute(sql,(latitud,longitud,sem))
            connection.commit()
            connection.close()
            s.enter(5, 1, do_something, (sc,))
s.enter(5, 1, do_something, (s,))
s.run()