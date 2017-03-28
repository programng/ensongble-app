import os
import sys
import json
import pandas as pd
import numpy as np
import librosa
from sklearn.externals import joblib
from functools import partial

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    lines = read_in()
    print lines[0]

if __name__ == '__main__':
    main()
