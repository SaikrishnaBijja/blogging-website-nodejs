def printSeries(n):
    i=2
    sum=2
    result=""
    while(sum<n):
        result+=str(sum)+","
        sum+=i
        i+=2
    return result[:len(result)-1]


def moveZeroToEnd(chits):
    zero=chits.count(0)
    chits=sorted(chits)
    z=chits[:zero]
    o=chits[zero:]
    return o+z


print(moveZeroToEnd([0,0,1,0,0,2,3,0,4,0,0]))