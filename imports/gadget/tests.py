import re
import sys
from StringIO import StringIO

import gadget.ast as ast
import gadget.checks as checks

tests = {}

def register(name,message=None,function=None,requires=[]):
  tests[name] = {
    "message": message or '', 
    "function":function,
    "requires": requires
  }
  
  def decorator(func):
    tests[name]["function"] = func
    def wrapper(*args, **kwargs):
      print(func)
      return func(*args, **kwargs)
    return wrapper
  return decorator 

def capture(func,*args,**kwargs):
  ret = None
  err = None
  oldout = sys.stdout

  try:
    out = StringIO()
    sys.stdout = out
    ret = func(*args,**kwargs)
  except Exception, e:
    err = str(e)
  finally:
    sys.stdout = oldout
  
  return [ret, out.getvalue(), err]

def pretty(o):
  if type(o) is str:
    s = '"' + o + '"' 
  elif type(o) is list:
    s = "[" + ",".join([pretty(x) for x in o]) + "]"
  elif type(o) is dict:
    s = "{" + ",".join([pretty(k) + ":" + pretty(v) for k,v in o.items()]) + "}"
  else:
    s = str(o)
  return s.replace('<','&lt;').replace('>','&gt;')

def run(execute=True):
  with open("main.py") as main:
    code = main.read()
  
  def import_main():
    import main
  
  if execute:
    _, output, error = capture(import_main)
  else:
    output, error = None, None

  for name in tests:
    requirements = True
    
    # make sure all requirements are satisfied
    for require in tests[name]['requires']:
      result = require(code,output,error)
      if result != True:
        requirements = False
        if len(tests[name]["message"]) > 0:
          tests[name]["message"] += "<br/>" 
          result = "<strong>" + result + "</strong>"
        checks.addFailure(name,name,tests[name]["message"],result)
        break
    
    if requirements:
      if tests[name]['function'] is None:
        raise "Your test did not register a function!"

      # looks good - run the test
      result = tests[name]['function'](code,output,error)
      
      if result == True:
        checks.addSuccess(name,name)
      elif result == False:
        checks.addFailure(name,name,tests[name]["message"],'')
      elif type(result) is str:
        if len(tests[name]["message"]) > 0:
          tests[name]["message"] += "<br/>" 
          result = "<strong>" + result + "</strong>"
        checks.addFailure(name,name,tests[name]["message"],result)
      else:
        checks.addFailure(name,name,"The test returned an unknown result type (%s)" % pretty(type(result)),'')

def setInput(*args):
  class StandardInput():
    def __init__(self,*strings):
      self.strings = list(strings)
    
    def readline(self):
      if len(self.strings) == 0:
        return ""
      else:
        return self.strings.pop(0)
  
  sys.stdin = StandardInput(*args)
        
def requireValidSyntax():
  def curried(code,output,error):
    try:
      ast.parse(code)
      return True
    except Exception, e:
      return "This test failed because of a syntax error in your code: " + str(e).split(": ",2)[1]
  return curried

def requireNoErrors():
  def curried(code,output,error):
    if error is None:
      return True
    else:
      return "This test failed because of an error in your code: <b>" + error + "</b>"
  return curried

def requireCallsFunction(func):
  if ("." in func):
    mod,func = func.split(".")
    test = lambda x: (
      (x['_astname'] == 'Call') and 
      ('func' in x) and 
      ('attr' in x['func']) and 
      (x['func']['attr'] == func) and
      ('value' in x['func']) and 
      ('id' in x['func']['value']) and
      (mod == "_" or x['func']['value']['id'] == mod)
    )
  else:
    test = lambda x: (
      (x['_astname'] == 'Call') and 
      ('func' in x) and 
      ('id' in x['func']) and 
      (x['func']['id'] == func)
    )

  def curried(code,output,error):
    tree = ast.parse(code)
    r = ast.find(tree, test)
    return len(r) > 0
  return curried

def assertNoErrors(name=None,message=None):
  register(name=name or "No errors in code", function = requireNoErrors())

def assertImports(mod,name=None,message=None):
  @register(
    name=name or "Imports <tt>" + mod + "</tt>",
    message=message or "Did not find an import for <tt><b>" + mod + "</b></tt>",
    requires=[requireValidSyntax()]
  )
  def checkImport(code,output,error):
    tree=ast.parse(code)
    result = ast.find(tree,lambda x: x['_astname']=='alias' and x['name']==mod)
    return len(result) > 0

def requireDefinesFunction(func):
  def curried(code,output,error):
    tree = ast.parse(code)
    defs = ast.find(tree, lambda x: x["_astname"] == "FunctionDef" and x["name"] == func) 
    if len(defs) > 0:
      return True
    else:
      return "There is no definition for the function <tt><b>" + func + "</b></tt> in your code"
  return curried

def requireFunctionHasArity(func,arity):
  def curried(code,output,error):
    tree = ast.parse(code)
    defs = ast.find(tree, lambda x: x["_astname"] == "FunctionDef" and x["name"] == func) 
    if len(defs) > 0:
      nArgs = len(defs[0]['args']['args'])
      if nArgs == arity:
        return True
      else:
        return "The function <tt><b>" + func + "</b></tt> should take <b>" + str(arity) + "</b> arguments not <b>" + str(nArgs) + "</b>"
    else:
      return "There is no definition for the function <tt><b>" + func + "</b></tt> in your code"
  return curried

def assertCallsFunction(funcs,name=None,message=None):
  if type(funcs) is not list:
    funcs = [funcs]
    
  names = [x.split(".",2)[1] if x.startswith("_") else x for x in funcs]
  names = ["<tt><b>" + x + "</b></tt>" for x in names]
  
  @register(
    message = message,
    requires = [requireValidSyntax()],
    name = name or "Code calls function " + " or ".join(names)
  )
  def checkAllFunctions(code,output,error):
    results = [requireCallsFunction(x)(code,output,error) for x in funcs]
    print(results)
    if True in results:
      return True
    else:
      return "Did not find a call to the function " + " or ".join(names) + " in your code"

def assertDoesNotCallFunction(func,name=None,message=None):
  register(
    name = name or "Does not call function <tt>" + func + "</tt>",
    message = message or "You should not be calling the <tt><b>" + func + "</b></tt> function in your code",
    requires = [requireValidSyntax()],
    function = lambda c,o,e: not requireCallsFunction(func)(c,o,e)
  )
  
def assertCodeMatches(pattern,name=None,message=None,flags=0):
  register(
    name = name or 'Code matches pattern ' + pretty(pattern), 
    message = message or 'Did not find the pattern <b>' + pretty(pattern) + '</b></tt> in your code',
    function = lambda c,o,e: len(re.findall(pattern,c,flags)) > 0
  )

def assertCodePrints(pattern,name=None,message=None,flags=re.IGNORECASE):
  register(
    name = name or 'Code prints "' + pattern + '"', 
    message = message or 'Did not find the pattern <b>' + pretty(pattern) + '</b> in the output printed by your code',
    function = lambda c,o,e: len(re.findall(pattern,o,flags)) > 0
  )

def assertDefinesFunction(func,name=None,message=None):
  register(
    name = name or "Code defines function <tt>" + func + "</tt>",
    message = message,
    requires = [requireValidSyntax()],
    function = requireDefinesFunction(func)
  )
  
def assertFunctionHasArity(func,arity,name=None,message=None):
  register(
    name = name or "Function <tt>" + func + "</tt> takes " + str(arity) + " arguments",
    message = message,
    requires = [requireValidSyntax()],
    function = requireFunctionHasArity(func,arity)
  )

def assertFunctionReturns(expected,func,args=[],name=None,message=None):
  if type(args) is not list:
    args = [args]
  
  funcStr = "<tt>" + func + "(" + ",".join([pretty(x) for x in args]) + ")</tt>"
  
  @register(
    message = message,
    requires = [
      requireNoErrors(), 
      requireFunctionHasArity(func,len(args))
    ],
    name = name or funcStr + " returns <tt>" + pretty(expected) + "</tt>"
  )
  def functionReturns(code,output,error):
    import main
    
    ret,out,err = capture(getattr(main,func),*args)
    if err is not None:
      return "An error occurred calling " + funcStr + ": <b>" + str(err) + "</b>"
    elif ret == expected:
      return True
    elif message is not None:
      return message
    else:
      return "Your function returned <tt><b>" + pretty(ret) + "</b></tt>, expected <tt><b>" + pretty(expected) + "</b></tt>"

def assertFunctionPrints(pattern,func,args=[],name=None,message=None,flags=re.IGNORECASE): 
  if type(args) is not list:
    args = [args]
  
  funcStr = "<tt>" + func + "(" + ",".join([pretty(x) for x in args]) + ")</tt>"
  
  @register(
    message = message,
    requires = [
      requireNoErrors(), 
      requireFunctionHasArity(func,len(args))
    ],
    name = name or funcStr + " prints " + pretty(pattern)
  )
  def functionPrints(code,output,error):
    import main
    
    ret,out,err = capture(getattr(main,func),*args)
    if err is not None:
      return "An error occurred calling " + funcStr + ": <b>" + str(err) + "</b>"
    elif re.findall(pattern,out,flags):
      return True
    elif message is not None:
      return False
    else:
      return 'Did not find the pattern <b>' + pretty(pattern) + '</b> in the output printed by your code'

def assertHasSyntaxNode(node,name=None,message=None):
  @register(
    name = name or "Code contains a <tt>" + node.lower() + "</tt>",
    message = message or "Did not find a <tt><b>" + node.lower() + "</b></tt> in your code",
    requires = [requireValidSyntax()]
  )
  def hasSyntaxNode(code,output,error):
    tree = ast.parse(code)
    return len(ast.find(tree,lambda x: x["_astname"] == node)) > 0
