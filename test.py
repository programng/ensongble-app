import sys
import json
import numpy as np

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    print 'hi'
    lines = read_in()
    np_lines = np.array(lines)
    lines_sum = np.sum(np_lines)
    print lines_sum

if __name__ == '__main__':
    print 'meow'
    main()
