class Monitor {
  constructor(target, {iframes=false}={}) {
    this.target = target;
    this.iframes = iframes;

    this.mutationMonitors = [];

    this.mutations = new MutationObserver(entries => {
      entries.forEach(entry => {
        for (const [index, monitor] of this.mutationMonitors.entries()) {
          for (let node of monitor.nodes(entry)) {
            if (node.matches && node.matches(monitor.selector)) {
              if (monitor.callback(node, entry) == false) {
                this.removeMutationMonitor(monitor);
                break;
              }
            }
          }
        }
      });
    });

    this.intersectMonitors = [];

    this.intersections = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        for (const [index, monitor] of this.intersectMonitors.entries()) {
          for (let node of monitor.nodes) {
            if (entry.target == node && monitor.entryTest(entry)) {
              if (monitor.callback(node, entry) == false) {
                this.removeIntersectMonitor(monitor);
                break;
              }
            }
          }
        }
      });
    });
  }

  // returns true if we can access this iframe
  // https://bit.ly/iframe-loaded
  accessible(iframe) {
    try {
      return Boolean(iframe.contentDocument);
    }
    catch(e) {
      console.log(e);
      return false;
    }
  }

  // iframe's are initially loaded with a dummy document, so you have 
  // to wait until their real document has loaded to hook them
  // https://bit.ly/iframe-loaded
  loaded(iframe, callback) {
    if (this.accessible(iframe)) {
      var src = iframe.src || "about:blank";
      var location = iframe.contentWindow.location.href;
      var ready = iframe.contentDocument.readyState === "complete";

      if (ready && src == location) {
        callback(iframe.contentDocument);
      } else {
        var load = () => {  
          if (this.accessible(iframe)) {
            callback(iframe.contentDocument);
          }
          iframe.removeEventListener('load', load);
        }
        iframe.addEventListener('load', load)    
      }
    }
  }

  addMutationMonitor(monitor) {
    this.mutationMonitors.push(monitor);

    // we just added the first monitor, so start observing
    if (this.mutationMonitors.length == 1) {
      if (this.iframes) {
        this.added('iframe', iframe =>
          this.loaded(iframe, doc => 
            this.mutations.observe(doc, { subtree: true, childList: true })
          )
        );
      }
      
      this.mutations.observe(this.target, { subtree: true, childList: true });
    } 

    return { cancel: () => this.removeMutationMonitor(monitor) }
  }

  removeMutationMonitor(monitor) {
    const index = this.mutationMonitors.indexOf(monitor);

    if (index > -1) {
      this.mutationMonitors.splice(index, 1);
    }

    if (this.mutationMonitors.length == 0) {
      this.mutations.disconnect();
    }
  }

  added(selector, callback) {
    // check the target for pre-existing nodes matching this selector
    const targets = [this.target];

    // check iframes within this target for pre-existing content 
    // matching this selector. Note that this means we will recurse
    // into iframes when creating Monitors with iframes=true 
    if (this.iframes) {
      for (let iframe of this.target.querySelectorAll('iframe')) {
        if (this.accessible(iframe)) {
          targets.push(iframe.contentDocument);
        }
      }
    }

    for (let target of targets) {
      for (let node of target.querySelectorAll(selector)) {
        if (callback(node, null) === false) {
          return { cancel: () => {} };
        }
      }
    }

    return this.addMutationMonitor({
      selector: selector,
      callback: callback,
      nodes: entry => entry.addedNodes
    });
  }

  removed(selector, callback) {
    return this.addMutationMonitor({
      selector: selector,
      callback: callback,
      nodes: entry => entry.removedNodes
    });
  }

  addIntersectMonitor(monitor) {
    this.intersectMonitors.push(monitor);

    return {
      cancel: () => this.removeIntersectMonitor(monitor)
    };
  }

  removeIntersectMonitor(monitor) {
    const index = this.intersectMonitors.indexOf(monitor);

    if (index > -1) {
      monitor.mutationMonitor.cancel();
      this.intersectMonitors.splice(index, 1);
    
      monitor.nodes.forEach(node => {
        const canRemove = this.intersectMonitors.every(otherMonitor => {
          otherMonitor.nodes.indexOf(node) === -1;
        });

        if (canRemove) {
          this.intersections.unobserve(node);
        }
      });
    }
  }

  intersect(selector, callback, entryTest) {
    const nodes = [];

    const mutationMonitor = this.added(selector, node => {
      nodes.push(node);
      this.intersections.observe(node);
    })

    return this.addIntersectMonitor({
      nodes: nodes,
      selector: selector,
      callback: callback,
      mutationMonitor: mutationMonitor,
      entryTest: entryTest
    });
  }

  appeared(selector, callback) {
    return this.intersect(selector, callback, entry => entry.isIntersecting);
  }

  disappeared(selector, callback) {
    return this.intersect(selector, callback, entry => !entry.isIntersecting);
  }

  cancel() { 
    this.mutations.disconnect();
    this.intersections.disconnect();

    this.mutationMonitors.splice(0, this.mutationMonitors.length);
    this.intersectMonitors.splice(0, this.intersectMonitors.length);
  }
}

export default (...params) => new Monitor(...params);